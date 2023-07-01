import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editemployee.css";
import axios from "axios";

import Form from "react-bootstrap/Form";

function EditEmployee() {
  let { empId } = useParams();

  const [state, setstate] = useState({
    fristname: "",
    lastname: "",
    email:"",
    dob: "",
    salary: "",
    department: "",
  });

  const [errors, setErrors] = useState({
    fristname: "",
    lastname: "",
    email: "",
    dob: "",
    salary: "",
    department: "",
  });

  const [deps, setDeps] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://localhost:7084/api/Employee/${empId}`)
      .then((res) => setstate(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`https://localhost:7084/api/Department`)
      .then((res) => setDeps(res.data))
      .catch((err) => console.log(err));
  }, [empId]);

  const submitfunc = (event) => {
    event.preventDefault();

    axios
      .put(`https://localhost:7084/api/Employee/${empId}`, {
        fristname: state.fristname,
        lastname: state.lastname,
        email: state.email,
        dob: state.dob,
        salary: state.salary,
        department: state.department,
      })
      .then(() => {
        alert("Updated");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setstate(() => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  return (
    <div className="GeeksForGeeks">
      <div className="n1">
        <label for="exampleInputPassword1" className="title">
          <h2>Edit employee details</h2>
        </label>
        <form onSubmit={submitfunc}>
          <div class="n2">
            <div class="n3">
              <label for="exampleInputPassword1" class="form-label">
                Frist Name
              </label>
              <input
                name="fristname"
                value={state.fristname}
                onChange={handleChange}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div class="n3">
              <label for="exampleInputPassword1" class="form-label">
                Last Name
              </label>
              <input
                name="lastname"
                value={state.lastname}
                onChange={handleChange}
                type="text"
                class="form-control"
              />
            </div>

            <div class="n3">
              <label for="exampleInputPassword1" class="form-label">
                Email
              </label>
              <input
                name="email"
                value={state.email}
                onChange={handleChange}
                type="text"
                class="form-control"
              />
            </div>

            <div class="n3">
              <label for="exampleInputPassword1" class="form-label">
                Date of birth
              </label>
              <input
                name="dob"
                value={state.dob}
                onChange={handleChange}
                type="date"
                class="form-control"
              />
            </div>

            <div class="n3">
              <label for="exampleInputPassword1" class="form-label">
                Salery
              </label>
              <input
                name="salary"
                value={state.salary}
                onChange={handleChange}
                type="text"
                class="form-control"
              />
            </div>

            <div class="n3">
              <label for="exampleInputPassword1" class="form-label">
                Department
              </label>
              <select
                name="department"
                value={state.department}
                onChange={handleChange}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>

                {deps.map((d, i) => (
                  <option key={i} value={d.departmentID}>
                    {d.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <div class="btn">
              <button type="submit" class="btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
