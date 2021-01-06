import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authContext } from "../contexts/AuthContext";

export default class MyItems extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state={
            items:[]
        }
      }
      componentDidMount() {
        const {auth,userID} = this.context;
        axios.post('http://localhost:5000/api/borrow/user',{id : userID.data},
        {headers: {Authorization: 'Bearer '+auth.data}}
        ).then(response => {
            if(response.status===400){
                console.log(response.statusText);
            }
            else{
                console.log(response.data);
                this.setState({
                    items: response.data
                  })
            }
        })
      }
      static contextType = authContext;

  render() {
    return (
        <div class="w3-container" style={{minHeight:"80vh"}}>
            <h2>My Items</h2>

            <table class="w3-table-all w3-hoverable">
                <thead>
                <tr class="w3-light-grey">
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Expiry</th>
                </tr>
                </thead>
                {this.state.items.map(item => (
                    <tr>
                    <td>{item.itemName}</td>
                    <td>{item.itemName}</td>
                    <td>{item.itemName}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
  }
}