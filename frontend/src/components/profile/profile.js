import { React, useEffect, useRef, useState } from "react";
import './profile.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {

    const [visible, setVisible] = useState(false);
    const sortRef = useRef();
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    
    const handleClick = (e) => {
        
        signOut(()=>navigate('/login', { replace: true }))
    }

    const hiddenProfile = (visible) => {
        const card = document.querySelector('.card');
        if(card){
            card.style = hiddenClass;
            setTimeout(()=>setVisible(visible), 600)
        }
    }

    const showProfile = (e)=>{
        setVisible(!visible)
    }

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());//for Firefox event.path
        if (!path.includes(sortRef.current)) {
            hiddenProfile(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, [])

    const hiddenClass = 'animation: unreveal 0.6s ease';

    const showClass = { animation: 'reveal 0.6s ease' };

    return(
        <div ref={sortRef} className="container-profile">
            {visible && <div className='card' style={showClass} tabIndex="-1">
                    <div className="top-container">
                        <img src="https://i.imgur.com/G1pXs7D.jpg" className="img-fluid profile-image" width="70"/>
                        
                        <div className="ml-3">
                            <h5 className="name">{user.login}</h5>
                            <p className="mail">{user.role}</p>
                        </div>
                    </div>

                    <button className="btn middle-container link mt-3 p-2" onClick={(e)=>handleClick(e)}>LogOut</button>
            </div>}
            <img src="https://i.imgur.com/G1pXs7D.jpg" onClick={visible?()=>hiddenProfile(!visible):()=>showProfile()} className="img-fluid profile-image img-circle" width="40"/>
        </div>
    )
}

export default Profile;