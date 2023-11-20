import { React, useState } from "react";
import './pages.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingIn = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users/login', {
            login: login,
            password: password
        })
        .then(({status, data})=>{
            if(status === 200){
                navigate('/');
                setLogin('');
                setPassword('');
            }else{console.log(data);}
        }).catch((e)=>console.log(e))
    }

    return(
        <div className="container-pages">
            <h1>SingIn</h1>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" value={login} onChange={(e)=>setLogin(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SingIn;