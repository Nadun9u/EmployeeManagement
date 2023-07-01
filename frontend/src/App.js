import { BrowserRouter, Routes, Route } from "react-router-dom";

import addEmployee from "./Components/screens/addemployee/addEmployee";
import allEmployee from "./Components/screens/allemployee/allEmployee";
import deleteEmployee from "./Components/screens/deleteemployee/deleteEmployee";
import editEmployee from "./Components/screens/editemployee/editEmployee";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/addEmployee" Component={addEmployee}></Route>
        <Route path="/" Component={allEmployee}></Route>
        <Route path="/deleteEmployee" Component={deleteEmployee}></Route>
        <Route path="/editEmployee/:empId" Component={editEmployee}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
