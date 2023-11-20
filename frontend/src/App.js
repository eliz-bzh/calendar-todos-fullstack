import './App.css';
import { CalendarTodos, SingIn, SingUp } from './pages';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<CalendarTodos/>} />
      <Route path='/login' element={<SingIn/>} />
      <Route path='/register' element={<SingUp/>} />
    </Routes>
  );
}

export default App;
