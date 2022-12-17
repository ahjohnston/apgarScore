import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect } from "react";

export function ViewGoals() {
  const [allGoals, setAllGoals] = useState({});

  let newDate = new Date();
  let year = newDate.getFullYear();
  let month = String(newDate.getMonth() + 1).padStart(2, "0");
  let day = String(newDate.getDate()).padStart(2, "0");
  let defaultDate = year + "-" + month + "-" + day;

  const [dayOf, setDayOf] = useState(defaultDate);
  const [weekOf, setWeekOf] = useState(defaultDate);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/goals/view",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        setAllGoals(response.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }); //empty array means this will not run continuously

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
        console.log(response);
      })
      .catch((error) => {
        console.log("error sir", error);
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
        console.log(response);
      })
      .catch((error) => {
        console.log("error sir", error);
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
    const newDate = new Date(e.target.value);
    let year = newDate.getFullYear();
    let month = String(newDate.getMonth() + 1).padStart(2, "0");
    let day = String(newDate.getDate() + 1).padStart(2, "0");
    let renderDate = year + "-" + month + "-" + day;

    if (e.target.name === "daily") {
      setDayOf(renderDate);
    } else {
      setWeekOf(renderDate);
    }
  }

  // function updatePlan(e){
  //   axios({
  //     method: "patch",
  //     url: "http://localhost:8080/records/byId",
  //     params: {
  //       id: e.target.key,
  //       complete: e.target.checked,
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log("error sir", error);
  //     });
  // }

  return (
    <>
      {/* <div>
        <h2> Daily Goals</h2>
        <input
          type="date"
          onChange={onDateChange}
          value={dayOf.toString().slice(0)}
          name="daily"
        ></input>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Done</th>
              <th>Goal Name</th>
              <th>Plan</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allGoals.length > 0
              ? allGoals.map((goal) => {
                  if (goal.frequency === "daily") {
                    goal.records.map((record) => {
                      if (record.startDate.slice(0, 10) === dayOf) {
                        return (
                          <tr key={goal.id}>
                            <td>
                              <input
                                id={goal.id}
                                type="checkbox"
                                onChange={markComplete}
                              ></input>
                            </td>
                            <td> {goal.goalName}</td>
                            <td> Plan</td>
                            <td>
                              <button>Delete</button>
                            </td>
                          </tr>
                        );
                      }
                    });
                  }
                })
              : null}
          </tbody>
        </Table>
      </div> */}
      <div>
        <h2> Weekly Goals</h2>
        <input
          type="date"
          onChange={onDateChange}
          value={weekOf.toString().slice(0)}
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
            {allGoals.length > 0
              ? allGoals.map((goal) => {
                  // if (goal.frequency === "weekly" ) {
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

                  // }
                })
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
}
