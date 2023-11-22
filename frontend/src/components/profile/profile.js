import { React } from "react";
import './profile.css';
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {

    const { user } = useAuth();

    
    const handleClick = (e) => {
        console.log('logout')
        Cookies.remove('session');
        Cookies.remove('session.sig');
        //singOut(()=>navigate('/', { replace: true })) //not working
    }

    const showProfile = (e) => {
        console.log('show');
        //card.classList.toggle('profile--expanded');
        const card = document.querySelector('.card');
        card.classList.toggle('container-profile--expanded');
    }

    const hidden = (e)=>{
        console.log('hidde')
        const card = document.querySelector('.card');
        card.classList.toggle('container-profile--expanded');
    }

    return(
        <div className="container-profile">
            <div className="card container-profile--unexpanded" tabIndex="-1">
            <div className="header-container">
                <button className="btn-close text-reset" onClick={hidden} aria-label="Close"></button>
            </div>
                <div className="top-container">
                    <img src="https://i.imgur.com/G1pXs7D.jpg" className="img-fluid profile-image" width="70"/>
                    
                    <div className="ml-3">
                        <h5 className="name">{user.login}</h5>
                        <p className="mail">{user.role}</p>
                    </div>
                </div>

                <Link className="middle-container link mt-3 p-2" onClick={(e)=>handleClick(e)} to={'/login'}>LogOut</Link>

            </div>
            <img src="https://i.imgur.com/G1pXs7D.jpg" onClick={(e)=>showProfile(e)} className="img-fluid profile-image img-circle" width="40"/>
        </div>
    )
}

export default Profile;