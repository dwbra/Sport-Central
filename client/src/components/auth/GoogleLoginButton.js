import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from "axios";

const GoogleLoginButton = () => {
    const responseSuccessGoogle = (response) => {
        //console.log("profileObj ",response.profileObj)
        //console.log("token",response.tokenId)
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/gLogin',
            data: response,
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
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                //responseType='id_token'
                onSuccess={(r) => {responseSuccessGoogle(r)}} 
                onFailure={err => console.log('fail', err)} 
            />
        </div>
    );
};

export default GoogleLoginButton;