import React from 'react';
import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";

const imgStyle = {
    width: '40px', 
    height: '40px',
    borderRadius: '50%',
    padding: 10,
    //boxShadow: "0px 10px 20px #00000060",
}

const IsLoggedIn = () => {

    if (localStorage.getItem('jwt') === null) {
        localStorage.setItem('jwt', undefined)
        localStorage.setItem('icon', undefined)
        localStorage.setItem('name', undefined)
    }

    const userJwt = localStorage.getItem('jwt')
    const userName = localStorage.getItem('name')
    const userimageUrl = localStorage.getItem('icon')

    if (userJwt === "undefined") {

        return (
            <GoogleLoginButton/>
        );

    } else {

        return (
            <div>
                <h1>{userName}</h1>
                <img src={userimageUrl} style={imgStyle} alt={"googleimageUrl"} />
                <GoogleLogoutButton/>
            </div>
        );

    }
};

export default IsLoggedIn;