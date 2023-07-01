import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./allemployee.css";
function AllEmployee() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const fetchEmps = async () => {
    axios
      .get(`https://localhost:7084/api/Employee`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmps();
  }, []);

  const postDelete = (id) => {
    axios
      .delete(`https://localhost:7084/api/Employee/${id}`)
      .then(() => {
        alert("Deleted");
        fetchEmps();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="GeeksForGeeks">
      <div className="container">
        <button className="btnadd" onClick={() => navigate("/addEmployee")}>
          {" "}
          Add Employee{" "}
        </button>

        <div className="m2">
          <h2>All Employee Details</h2>
        </div>

        <div className="m3">
          <table>
            <thead>
              <tr>
                <th>Frist Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Date of birth</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Department</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.fristname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td className="th1">{user.dob}</td>
                    <td>{user.age}</td>
                    <td>{user.salary}</td>
                    <td>{user.department?.departmentName}</td>
                    <td className="m6">
                      <button
                        className="dbtn"
                        onClick={() => postDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="m6">
                      <button
                        className="ebtn"
                        onClick={() => navigate(`/editEmployee/${user.id}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllEmployee;
