import { React, useState } from "react";
import './pages.css';
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SingIn = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { singIn } = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users/login', {
            login: login,
            password: password
        })
        .then(({data})=>{
            singIn(data.user, ()=>navigate(fromPage, {replace: true}));
        }).catch((e)=>console.log(e))
    }

    return(
        <div className="container-pages">
            <h1>Sing in</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" value={login} onChange={(e)=>setLogin(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sing in</button>
                <Link to={'/register'}>Create an account</Link>
            </form>
        </div>
    )
}

export default SingIn;