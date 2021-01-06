import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authContext } from "../contexts/AuthContext";
import authHeader from "../contexts/AuthHeader";

export default class Profile extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state={
            username:'', email:'', role:'',userId:''
        }
      }

      componentDidMount() {
        const {auth,userID} = this.context;
        axios.post('http://localhost:5000/api/user/',{id : userID.data},
        {headers: {Authorization: 'Bearer '+auth.data}}
        ).then(response => {
          console.log(response.msg);
            if(response.status===400){
                console.log(response.statusText);
            }
            else{
                this.setState({
                    username: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                    userId: response.data._id
                  })
            }
        })
      }
      static contextType = authContext;

  render() {
    return (
        <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{this.state.username}</strong>
        </h3>
      </header>
      <p>
        <strong>UserID:</strong> {this.state.userId}
      </p>
      <p>
        <strong>Id:</strong> {this.state.email.substr(0,9)}
      </p>
      <p>
        <strong>Email:</strong> {this.state.email}
      </p>
      <strong>ROLE : {this.state.role }</strong>
    </div>
    );
  }
}