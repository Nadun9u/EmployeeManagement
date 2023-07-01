import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./employee.css"



 function isValidEmail(email) {
   return /\S+@\S+\.\S+/.test(email);
 }

function AddEmployee() {
  const [state, setstate] = useState({
    fristname: "",
    lastname: "",
    email: "",
    dob: "",
    salary: "",
    department: "",
  });


const [errors, setErrors] = useState(false);
  const [deps, setDeps] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://localhost:7084/api/Department`)
      .then((res) => setDeps(res.data))
      .catch((err) => console.log(err));
  }, []);

  const submitfunc = (event) => {
    event.preventDefault();
       if (
         state.fristname.length == 0 ||
         state.lastname.length == 0 ||
         state.email.length == 0 ||
         state.dob.length == 0 ||
         state.department.length == 0
       ) {
         setErrors(true);
       }

      

    axios
      .post(`https://localhost:7084/api/Employee`, {
        fristname: state.fristname,
        lastname: state.lastname,
        email: state.email,
        dob: state.dob,
        salary: state.salary,
        departmentID: state.department,
      })
      .then(() => {
        alert("Added");
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
     <div className="nc">
       <div className="nh">
         <label for="exampleInputPassword1" className="title">
           <h2>Add Employee</h2>
         </label>
       </div>

       <form onSubmit={submitfunc}>
         <div class="nb2">
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
           {errors && state.fristname.length <= 0 ? (
             <label className="lb">Frist Name can't be empty !</label>
           ) : (
             ""
           )}
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

             {errors && state.lastname.length <= 0 ? (
               <label className="lb">Last Name can't be empty !</label>
             ) : (
               ""
             )}
             <div class="n3">
               <label for="exampleInputPassword1" class="form-label">
                 Email
               </label>
               <input
                 name="email"
                 value={state.email}
                 onChange={handleChange}
                 type="email"
                 class="form-control"
               />
             </div>
             {errors && !isValidEmail(state.email) ? (
               <label className="lb">Pleace enter valid email Address !</label>
             ) : (
               ""
             )}

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
             {errors && state.dob.length <= 0 ? (
               <label className="lb">Date of birth can't be empty !</label>
             ) : (
               ""
             )}

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
             {errors && state.salary.length <= 0 ? (
               <label className="lb">Salary can't be empty !</label>
             ) : (
               ""
             )}
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
             {errors && state.department.length <= 0 ? (
               <label className="lb">Department can't be empty !</label>
             ) : (
               ""
             )}

             <div class="btn">
               <button type="submit" class="btn1-primary">
                 Submit
               </button>
             </div>
           </div>
         </div>
       </form>
     </div>
   </div>
 );
}

export default AddEmployee;
