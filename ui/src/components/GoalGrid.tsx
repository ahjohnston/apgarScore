import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect } from "react";
import { DateWithoutTime } from "epoq/lib/DateWithoutTime";
import { printThisRecord } from "./methods.ts";
import { useSelector, useDispatch } from "react-redux";
import test from "node:test";

export function GoalGrid(props: {cadence: string}) {
  const [goals, setGoals] = useState([]);
  // const dateRedux = useSelector((state) => state.selectedDate.value)
  // console.log('test', dateRedux)

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(2); //TODO persist this as a 'user setting' or something
  const weekOf = getFirstDayOfWeek();
  const weekEnds = getLastDayOfWeek();

  const { cadence } = props;
  const cadenceCapital = cadence.charAt(0).toUpperCase() + cadence.slice(1);

  type Goal = {
    id: number;
    records: Record[];
    goalName: string;
    cadence: string;
    min_progress_events: number;
    category?: string;
    active: boolean;
  };
  type Record = {
    id: number | undefined;
    goalID?: number;
    plan?: string | undefined | null;
    planDate: Date | null;
    dateComplete?: Date | null | undefined;
  };
  type RecordResponse = {
    id: number | null;
    goalID: number;
    plan?: string | undefined | null;
    planDate?: string | null;
    dateComplete: string | null;
  };

  useEffect(() => {
    axios<Goal[]>({
      method: "get",
      url: `http://localhost:8080/goals/view?cadence=${cadence}`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        setGoals(
          response.data.map((datum) => {
            return {
              id: datum.id,
              goalName: datum.goalName,
              cadence: datum.cadence,
              min_progress_events: datum.min_progress_events,
              category: datum.category,
              active: datum.active,
              records: datum.records.map((record) => {
                return {
                  id: record.id,
                  goalID: record.goalID,
                  plan: record.plan,
                  planDate: record.planDate,
                  dateComplete: record.dateComplete
                    ? new Date(record.dateComplete)
                    : null,
                };
              }),
            };
          })
        );
      })
      .catch(function (error) {});
  }, [goals]);
  //second parameter for useEffect of an empty array means this will not run continuously
  //removing the second parameter --> runs continuously --> insufficient resources error
  //[weeklyGoals] --> useEffect will run whenever weeklyGoals changes. GOOD.

  function postNewRecord(params: Record) {
    axios({
      method: "post",
      url: "http://localhost:8080/records/add",
      params: params,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log("POST response", response);
      })
      .catch((error) => {
        console.log("error sir", error);
      });
  }

  function patchRecord(params: Record) {
    console.log("patch this record", params);
    axios({
      method: "patch",
      url: "http://localhost:8080/records/byId",
      params: params,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log("patch response", response);
      })
      .catch((error) => {
        console.log("error sir", error);
      });
  }

  function markComplete(e: { target: any }) {
    const { id, name, checked } = e.target;
    const myRecord: Record = {
      id: id,
      goalID: name,
      planDate: selectedDate,
      dateComplete: checked ? selectedDate : null,
    };
    console.log("target id", id);
    printThisRecord(myRecord);
    //if the record does not exist, do a POST
    if (!id) {
      postNewRecord(myRecord);
    } else {
      //if the recore already exists, do a PATCH
      //BUG this must include a 'plan' string (or null/undefined)
      //BUG id is not in myRecord
      patchRecord(myRecord);
    }
  }
  //TODO does it make sense to combine "updatePlan" with "markComplete" --> updateRecord? hmm doesn't seem Clean
  function updatePlan(e: any) {
    const { id, name, value } = e.target;
    const myRecord: Record = {
      id: id,
      goalID: name,
      plan: value,
      planDate: selectedDate, //default planDate is the 'selected date' from state
    };

    //if the record does not exist, do a POST
    if (!id) {
      postNewRecord(myRecord);
    } else {
      //if the recore already exists, do a PATCH
      patchRecord(myRecord);
    }
  }
  function changeFirstDayOfWeek(e: { target: any }) {
    setFirstDayOfWeek(Number(e.target.value));
  }
  //TODO is there a simpler way to do this? am i dumb?
  function getFirstDayOfWeek() {
    const differenceBetweenDays: number =
      selectedDate.getDay() - firstDayOfWeek;
    let myDate = new Date(selectedDate.toString());
    if (differenceBetweenDays > 0) {
      myDate.setDate(
        selectedDate.getDate() - selectedDate.getDay() + firstDayOfWeek
      );
      return myDate;
    } else if (differenceBetweenDays < 0) {
      myDate.setDate(
        selectedDate.getDate() - selectedDate.getDay() + firstDayOfWeek - 7
      );
      return myDate;
    } else {
      //TODO BUG week range is incorrect in this case
      return selectedDate;
    }
  }
  function getLastDayOfWeek() {
    let myDate = new Date(weekOf.toString());
    myDate.setDate(weekOf.getDate() + 6);
    return myDate;
  }
  function onDateChange(e: any) {
    setSelectedDate(new Date(e.target.value));
  }
  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div>
      <h2> {capitalize(cadence)} Goals</h2>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Done</th>
            <th>Goal Name</th>
            <th>Plan</th>
            <th>Edit this Goal</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal: Goal) => {
            let complete: boolean | null | undefined = false,
              recordId: number | undefined = undefined,
              recordPlan: string | null | undefined = ""; //this didn't work using NULL (the previous plan would stick around, instead of the placeholder text)
            //TODO move this functionality to the backend
            //instead of mapping through goals/records, and filtering by date
            //just make a get request  for recordsByGoalId / recordsByDate
            goal.records.map((record: Record) => {
              if (
                record.planDate &&
                new Date(record.planDate).toString().slice(0, 15) ==
                  selectedDate.toString().slice(0, 15)
              ) {
                recordId = record.id;
                recordPlan = record.plan;
              }
              complete =
                record.dateComplete &&
                new Date(record.dateComplete).toString().slice(0, 15) ==
                  selectedDate.toString().slice(0, 15);
            });
            return (
              <tr key={goal.id}>
                <td>
                  <input
                    id={recordId}
                    key={recordId}
                    name={goal.id.toString()}
                    type="checkbox"
                    checked={complete}
                    onChange={markComplete}
                  ></input>
                </td>
                <td> {goal.goalName}</td>
                <td>
                  <input
                    id={recordId}
                    key={recordId}
                    name={goal.id.toString()}
                    type="text"
                    placeholder="Add your plan here"
                    value={recordPlan || undefined}
                    onChange={updatePlan}
                  ></input>
                </td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
