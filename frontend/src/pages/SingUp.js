import { React, useState } from "react";
import axios from "axios";
import './pages.css';
import { useNavigate } from "react-router-dom";

const initialState = {
    name: { value:'', valid:null },
    surname: { value:'', valid:null },
    login: { value:'', valid:null },
    password: { value:'', valid:null },
    toastMessage: ''
}

const SingUp = () => {

    const regexNames = /^[a-zA-Z]{3,}$/;
    const regexLogin = /^[a-z]([._-](?![._-])|[a-z0-9]){4,16}[a-z0-9]$/gm;
    const regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    const [state, setState] = useState(initialState);
    const { name, surname, login, password, toastMessage } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users/create', {
            name: `${name.value} ${surname.value}`,
            role: 'user',
            login: login.value,
            password: password.value
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
                <div className='toast d-flex w-100 align-items-center text-bg-primary border-0 fade show' style={{paddingRight: '0.75rem'}} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body">{toastMessage}</div>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={()=>setState(prevState => ({...prevState, toastMessage: ''}))}></button>
                </div>
            </div>) : null}
                                        
            <h1>Sing Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label>Name</label>
                            <input type="name" required className={`form-control ${(regexNames.test(name.value))?('is-valid'):(typeof name.valid === 'boolean'?('is-invalid'):(''))}`} id="inputName" placeholder="Enter name" pattern={regexNames.source} value={name.value} onChange={(e)=>setState(prevState => ({...prevState, name:{value: e.target.value, valid:e.target.validity.valid}}))} />
                        </div>
                        <div className="col">
                            <label>Surname</label>
                            <input type="name" required className={`form-control ${(regexNames.test(surname.value))?('is-valid'):(typeof surname.valid === 'boolean'?('is-invalid'):(''))}`} id="inputSurname" placeholder="Enter surname" pattern={regexNames.source} value={surname.value} onChange={(e)=>setState(prevState => ({...prevState, surname:{value: e.target.value, valid: e.target.validity.valid}}))} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Login</label>
                    <input type="name" required className={`form-control ${(regexLogin.test(login.value))?('is-valid'):(typeof login.valid === 'boolean'?('is-invalid'):(''))}`} id="inputLogin" placeholder="Login" pattern={regexLogin.source} value={login.value} title="Must contain only lowercase letters and be 6-18 characters long. You can use special characters can be used ._- and numbers." onChange={(e)=>{setState(prevState => ({...prevState, login:{value: e.target.value, valid:e.target.validity.valid}}))}} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" required className={`form-control ${(regexPass.test(password.value))?('is-valid'):(typeof password.valid === 'boolean'?('is-invalid'):(''))}`} id="inputPassword" placeholder="Password" pattern={regexPass.source} value={password.value} title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={(e)=>setState(prevState => ({...prevState, password: {value: e.target.value, valid:e.target.validity.valid}}))} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sing Up</button>
            </form>
        </div>
    )
}

export default SingUp;