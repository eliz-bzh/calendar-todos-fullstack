import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState();

    const cookieSession = Cookies.get();

    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';

    useEffect(()=>{
        if(cookieSession && Object.keys(cookieSession).length !== 0){
            console.log('now getting cookies')
            axios.get('/api/users/getUserSession')
            .then(({status, data})=>{
                if(status === 401){
                    setUser(null)
                }else{
                    console.log(data.user)
                    singIn(data.user, ()=>navigate(fromPage, {replace: true}))
                }
            }).catch((e)=>console.log(e))
        }
    }, [])

    const singIn = (newUser, callback) => {
        setUser(newUser);
        callback();
    }

    const signOut = (callback) => {
        setUser(null);
        callback();
    } 

    console.log(user)
    
    const value = { user, singIn, signOut };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}