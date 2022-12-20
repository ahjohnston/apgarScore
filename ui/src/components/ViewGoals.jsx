import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect } from "react";

export function ViewGoals() {
  // const [allGoals, setAllGoals] = useState({});
  const [dailyGoals, setDailyGoals] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);

  let newDate = new Date();
  let year = newDate.getFullYear();
  let month = String(newDate.getMonth() + 1).padStart(2, "0");
  let day = String(newDate.getDate()).padStart(2, "0");
  let defaultDate = year + "-" + month + "-" + day;

  const [dayOf, setDayOf] = useState(defaultDate);
  const [weekOf, setWeekOf] = useState(defaultDate);
  const [weekStart, setWeekStart] = useState(1);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/goals/view?cadence=weekly",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        setWeeklyGoals(response.data);
      })
      .catch(function (error) {});
    axios({
      method: "get",
      url: "http://localhost:8080/goals/view?cadence=daily",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        setDailyGoals(response.data);
      })
      .catch(function (error) {
        // console.log("error", error);
      });
  }, []); //second parameter for useEffect of an empty array means this will not run continuously

  function postNewRecord(params) {
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
        // console.log(response);
      })
      .catch((error) => {
        // console.log("error sir", error);
      });
  }

  function patchRecord(params) {
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
        // console.log(response);
      })
      .catch((error) => {
        // console.log("error sir", error);
      });
  }

  function markComplete(e) {
    const { id, name, checked } = e.target;
    const params = {
      id: id,
      goalID: name,
      startDate: weekOf,
      endDate: weekOf,
      complete: checked,
      dateComplete: checked ? weekOf : null,
    };

    //if the record does not exist, do a POST
    if (!id) {
      postNewRecord(params);
    } else {
      //if the recore already exists, do a PATCH
      patchRecord(params);
    }
  }

  function updatePlan(e) {
    const { id, name, value, checked } = e.target;
    const params = {
      id: id,
      goalID: name,
      plan: value,
      startDate: weekOf,
      endDate: weekOf,
      complete: checked,
      dateComplete: checked ? weekOf : null,
    };
    //if the record does not exist, do a POST
    if (!id) {
      postNewRecord(params);
    } else {
      //if the recore already exists, do a PATCH
      patchRecord(params);
    }
  }

  function onDateChange(e) {
    let newDate = new Date(e.target.value);
    let formattedDate = newDate.toLocaleDateString("en-US", {
      timeZone: "UTC",
    });
    let year = newDate.getFullYear();
    let month = String(newDate.getMonth() + 1).padStart(2, "0");
    let day = String(newDate.getDate() + 1).padStart(2, "0");
    let renderDate = year + "-" + month + "-" + day;

    if (e.target.name === "daily") {
      setDayOf(renderDate);
    } else {
      // console.log('week starts on', weekStart)
      console.log("target date", e.target.value);
      console.log("Date from target date", newDate);
      console.log("ISO date", newDate.toISOString());
      console.log("split ISO", newDate.toISOString().split("T")[0]);

      // console.log('weekday of renderDate', e.target.value.valueAsDate, newDate, newDate.getDay())
      setWeekOf(formattedDate);
    }
  }
  function onWeekChange(e) {
    let newDate = new Date(e.target.value);
    let getDate = newDate.getDate();
    
    let adjustment = weekStart - newDate.getDay() + getDate;

    newDate.setDate(adjustment);
    console.log("adjusted date", newDate);
    console.log('locale date', newDate.toLocaleDateString())
    console.log('locale date w/ options', newDate.toLocaleDateString({
      month: '2-digit',
    dateStyle: "long"}))
    let formattedDate = newDate
      .toISOString("en-US")
      .split("T")[0];
    console.log("formatted date", formattedDate);

    setWeekOf(formattedDate);
  }
  function changeWeekStart(e) {
    setWeekStart(Number(e.target.value));
    console.log("week starts on", weekStart);
  }

  return (
    <>
      {/* <div>
        <h2> Daily Goals</h2>
        <input
          type="date"
          onChange={onDateChange}
          value={dayOf.toString().slice(0) || ''}
          name="daily"
        ></input>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Done</th>
              <th>Goal Name</th>
              <th>Plan</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dailyGoals.length > 0
              ? dailyGoals.map((goal) => {
                  let complete = false,
                    recordId = null,
                    recordPlan = "", //this didn't work using NULL (the previous plan would stick around, instead of the placeholder text)
                    recordMatch = false;
                  if (goal.records.length > 0) {
                    goal.records.map((record) => {
                      if (record.startDate.slice(0, 10) === weekOf) {
                        complete = record.complete;
                        recordId = record.id;
                        recordPlan = record.plan;
                        recordMatch = true;
                      }
                    });
                  }
                  //the key to this nested .map was to include a return statement for each .map
                  return (
                    <tr key={goal.id}>
                      <td>
                        <input
                          id={recordId}
                          name={goal.id}
                          type="checkbox"
                          checked={complete}
                          onChange={markComplete}
                        ></input>
                      </td>
                      <td> {goal.goalName}</td>
                      <td>
                        <input
                          id={recordId}
                          name={goal.id}
                          type="text"
                          placeholder="Add your plan here"
                          value={recordPlan}
                          onChange={updatePlan}
                        ></input>
                      </td>
                      <td>
                        <button>Edit</button>
                      </td>
                      <td>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div> */}
      <div>
        <h2>Weekly Goals</h2>
        <h3>
          My week starts on:
          <select list="weekday" onChange={changeWeekStart}>
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>Ï{" "}
          </select>
        </h3>
        <input
          type="date"
          onChange={onWeekChange}
          value={weekOf.toString().slice(0) ||''}
          name="weekly"
        ></input>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Done</th>
              <th>Goal Name</th>
              <th>Plan</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {weeklyGoals.length > 0
              ? weeklyGoals.map((goal) => {
                  let complete = false,
                    recordId = null,
                    recordPlan = "", //this didn't work using NULL (the previous plan would stick around, instead of the placeholder text)
                    recordMatch = false;
                  if (goal.records.length > 0) {
                    goal.records.map((record) => {
                      if (record.startDate.slice(0, 10) === weekOf) {
                        complete = record.complete;
                        recordId = record.id;
                        recordPlan = record.plan;
                        recordMatch = true;
                      }
                    });
                  }
                  //the key to this nested .map was to include a return statement for each .map
                  return (
                    <tr key={goal.id}>
                      <td>
                        <input
                          id={recordId}
                          name={goal.id}
                          type="checkbox"
                          checked={complete}
                          onChange={markComplete}
                        ></input>
                      </td>
                      <td> {goal.goalName}</td>
                      <td>
                        <input
                          id={recordId}
                          name={goal.id}
                          type="text"
                          placeholder="Add your plan here"
                          value={recordPlan || undefined}
                          onChange={updatePlan}
                        ></input>
                      </td>
                      <td>
                        <button>Edit</button>
                      </td>
                      <td>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
}
