import { React, useState } from "react";
import './pages.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users/create', {
            name: username,
            role: 'user',
            login: username,
            password: password
        })
        .then(({status, data})=>{
            if(status === 200){
                navigate("/login");
                setUsername('');
                setPassword('');
            }else{console.log(data);}
        })
        .catch((e)=>console.log(e))
    }

    return(
        <div className="container-pages">
            <h1>SingUp</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SingUp;