import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from "axios";

const GoogleLoginButton = () => {
    const responseSuccessGoogle = (response) => {
        console.log("profileObj ",response.profileObj);
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/gLogin',
            data: response.profileObj,
        }).then(serverResponse => {
            console.log("Susses ",serverResponse)
            localStorage.setItem('jwt', serverResponse.data.user.jwt)
            localStorage.setItem('icon', serverResponse.data.user.icon)
            localStorage.setItem('name', serverResponse.data.user.name)
            window.location.reload(false)
        });
    }


    return (
        <div>
            <GoogleLogin 
                clientId="460704800898-2f1vtr6mialaotgf3rp9ft04fs2bdf34.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(r) => {responseSuccessGoogle(r)}} 
                onFailure={err => console.log('fail', err)} 
            />
        </div>
    );
};

export default GoogleLoginButton;