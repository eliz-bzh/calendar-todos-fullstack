import { React, useState } from "react";
import './pages.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    toastMessage: ''
}

const SingUp = () => {

    const [state, setState] = useState(initialState);
    const { name, surname, login, password, toastMessage } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users/create', {
            name: `${name} ${surname}`,
            role: 'user',
            login: login,
            password: password
        })
        .then(({data})=>{
            console.log(data);
            if(data.login){
                setState(prevState => ({...prevState, toastMessage: data.message}))
                setTimeout(()=>{
                    setState(initialState);
                    navigate("/login")
                }, 500);
            }else{
                setState(prevState => ({...prevState, toastMessage: data.message}))
                setTimeout(()=>setState(prevState => ({...prevState, toastMessage: ''})), 6000);
            }
        })
        .catch((e)=>console.log(e))
    }

    return(
        
        <div className="container-pages">
            {(toastMessage !== '') ? (
            <div style={{position: "absolute", top:'1rem', right:'1rem'}}>
                <div class='toast d-flex w-100 align-items-center text-bg-primary border-0 fade show' style={{paddingRight: '0.75rem'}} role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-body">{toastMessage}</div>
                    <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick={()=>setState(prevState => ({...prevState, toastMessage: ''}))}></button>
                </div>
            </div>) : null}
                                        
            <h1>Sing Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label>Name</label>
                            <input type="name" required className="form-control" id="exampleInputName" placeholder="Enter name" value={name} onChange={(e)=>setState(prevState => ({...prevState, name: e.target.value}))} />
                        </div>
                        <div className="col">
                            <label>Surname</label>
                            <input type="name" required className="form-control" id="exampleInputSurname" placeholder="Enter surname" value={surname} onChange={(e)=>setState(prevState => ({...prevState, surname: e.target.value}))} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Login</label>
                    <input type="name" required className="form-control" id="exampleInputLogin" placeholder="Login" value={login} onChange={(e)=>setState(prevState => ({...prevState, login: e.target.value}))} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" required className="form-control" id="exampleInputPassword" placeholder="Password" value={password} onChange={(e)=>setState(prevState => ({...prevState, password: e.target.value}))} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sing Up</button>
            </form>
        </div>
    )
}

export default SingUp;