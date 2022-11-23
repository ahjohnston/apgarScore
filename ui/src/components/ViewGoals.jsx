import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect } from "react";

export function ViewGoals() {
  const [allGoals, setAllGoals] = useState({});

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
      }, []);
  });

  return (
    <>
    <div>
      <h2> Daily Goals</h2>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Done</th>
            <th>Goal Name</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {allGoals.length > 0
            ? allGoals.map((goal) => {
                if (goal.frequency === "daily") {
                  return (
                    <tr key={goal.id}>
                      <td>
                        <input type="checkbox"></input>
                      </td>
                      <td> {goal.goalName}</td>
                      <td> Plan</td>
                    </tr>
                  );
                }
              })
            : null}
        </tbody>
      </Table>
      </div>
      <div>
        <h2> Weekly Goals</h2>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Done</th>
              <th>Goal Name</th>
              <th>Plan</th>
              <td> Edit</td>
            </tr>
          </thead>
          <tbody>
            {allGoals.length > 0
              ? allGoals.map((goal) => {
                  if (goal.frequency === "weekly") {
                    return (
                      <tr key={goal.id}>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td> {goal.goalName}</td>
                        <td> Plan</td>
                        <td> Edit</td>
                      </tr>
                    );
                  }
                })
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
}
