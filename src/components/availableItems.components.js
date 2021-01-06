import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import { authContext } from "../contexts/AuthContext";

export default class AvailableItems extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state={
            items:[]
        }
        this.bookItem = this.bookItem.bind(this);
      }
      componentDidMount() {
        const {auth,userID} = this.context;
        axios.get('http://localhost:5000/api/item/all',
        {headers: {Authorization: 'Bearer '+auth.data}}
        ).then(response => {
            if(response.status===400){
                console.log(response.statusText);
            }
            else{
                
                this.setState({
                    items: response.data
                  })
            }
        })
      }
      
      bookItem = (itemname, quantity, labname) => {
        const {userID, auth} = this.context;
        axios.post('http://localhost:5000/api/borrow/create',
        {userId: userID.data, itemName: itemname, labName: labname, quantity: quantity, dueDate:Date()},
        {headers: {Authorization: 'Bearer '+auth.data}}
        ).then(response => {
            if(response.status===400){
                console.log(response.statusText);
            }
            else{
                alert("Order Placed: \nitem: "+itemname+" \nquantity: "+quantity)
            }
        })
      };

  render() {
    return (
        <div class="w3-container" style={{minHeight:"80vh"}}>
            <h2>Available Items</h2>

            <table class="w3-table-all w3-hoverable">
                <thead>
                <tr class="w3-light-grey">
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Lab</th>
                    <th>Request Order</th>
                </tr>
                </thead>

                {this.state.items.map(item => (
                    item.availableQuantity>0 && (
                <tr>
                <td>{item.itemName}</td>
                <td>{item.availableQuantity}</td>
                <td>{item.labName}</td>
                <td>
                    <div style={{width:"20%"}}>
                    <Button 
                        variant="primary"
                        type="button"
                        className="w-100 mt-3"
                        onClick ={ () => {
                            this.bookItem(item.itemName, 10, item.labName)
                        } }
                        >
                        Book
                    </Button>
                    </div>
                </td>
                </tr>
                )))}
            </table>
        </div>
    );
  }
}