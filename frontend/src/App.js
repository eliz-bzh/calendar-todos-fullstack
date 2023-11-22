import './App.css';
import { AuthProvider } from './hoc/AuthProvider';
import RequireAuth from './hoc/RequireAuth';
import { CalendarTodos, SingIn, SingUp } from './pages';
import { Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie';

function App() {

  console.log(Cookies.get());

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <CalendarTodos/>
          </RequireAuth>
        } />
        <Route path='/login' element={<SingIn/>} />
        <Route path='/register' element={<SingUp/>} />
      </Routes>
    </AuthProvider>
  );

}

export default App;
