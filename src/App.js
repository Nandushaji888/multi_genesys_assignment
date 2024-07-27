import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import HomePage from './components/HomePage';
import EmployeeDetails from './components/EmployeeDetails';
import AddEditEmployee from './components/AddEditEmployee';
function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/employee/:id' element={<EmployeeDetails/>} />
      <Route path='/add-employee' element={<AddEditEmployee/>} />
      <Route path='/employee/edit/:id' element={<AddEditEmployee/>} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
