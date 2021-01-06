import React, { useContext } from 'react';
import { authContext } from '../contexts/AuthContext';
import GoogleLogin from 'react-google-login';
import axios from 'axios';


const SignIn = ({history}) => {
  const {setAuthData, setRoleData, setUserID} = useContext(authContext); 

  const responseSuccessGoogle = response => {
    axios.post('http://localhost:5000/api/googlelogin',{idToken : response.tokenId}
    ).then(response => {
        if(response.status===400){
            console.log(response.statusText);
            Promise.reject();
        }
        else{
            const {token,user} = response.data;
            console.log(token);
            console.log(user);
            setAuthData(token);
            setRoleData(user.role);
            setUserID(user._id);
            Promise.resolve();
            history.replace('/');
        }
    })
  };

  const responseErrorGoogle = response => {
    console.log(response);
  };

  const cssLogin={
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    margin: "auto",
    width: "350px",
    height: "400px",
    borderRadius: "5px",
    background: "rgba(3,3,3,0.25)",
    boxShadow: "1px 1px 50px #000"
  };

  const cssh1={
    position: "relative",
    marginTop: "0px",
    textAlign: "center",
    fontSize: "40px",
    color: "#ddd",
    textShadow: "3px 3px 10px #000"
  };

  const cssForm={
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: "20px"
  };

  const cssLoginBody={
    background: "url(https://iitpkd.ac.in/sites/default/files/2019-06/dji_0159_0.jpg)",
    backgroundSize: "cover",
    height: "100vh", 
    className:"d-flex justify-content-center align-items-center",
    justifyContent: "center",
    overflow: "hidden"
  };

  return (
    <div class="loginBody" style={cssLoginBody}>
      <div class="register"  style={cssLogin}>
        <h1 style={cssh1}>SignIn</h1>
        <div style={cssForm}>
        <span>
          <img src="logo2.png" alt="#" style={{ display: "block",margin: "auto",width: "70%",height: "auto", paddingBottom: "50px"}}/>
        </span>
            <GoogleLogin
                clientId="1062439136371-dvg9finj9laaeh900cclughstqo32175.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
      </div>
    </div> 
  );
};

export default SignIn;