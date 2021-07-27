import React from 'react';
import axios from "axios";
import GoogleLogout from 'react-google-login';

const GoogleLogoutButton = () => {

    const responseSuccessGoogle = () => {
        console.log("Logout", localStorage.getItem('email'));
        var formData = new FormData();
        formData.append("email", localStorage.getItem('email'))
        axios({
            method: 'post',
            url: 'http://localhost:5000/auth/gLogout',
            data: formData,
        }).then(serverResponse => {
            console.log("logout ",serverResponse)
            localStorage.setItem('jwt', undefined)
            localStorage.setItem('imageUrl', undefined)
            localStorage.setItem('name', undefined)
            localStorage.setItem('email', undefined)
            window.location.reload(false)
        });
    }
  
    return (
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onSuccess={responseSuccessGoogle}
            onFailure={err => console.log('fail', err)}
            //isSignedIn={false}
        />
    );

};

export default GoogleLogoutButton;