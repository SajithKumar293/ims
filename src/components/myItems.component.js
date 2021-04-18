import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authContext } from "../contexts/AuthContext";
import { getMyItems } from '../actions/repository';
import MyItem from './myItem.component';

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
        getMyItems(auth.data,userID.data).then((items) =>this.setState({ items }));
        console.log(this.state.items)
    }

  render() {
    const { items } =  this.state;
    return (
        <div className=" container">
            <h3 className="card-title">List of Requested Items</h3><hr/>
          {items.map((product, index) => <MyItem product={product} key={index}/>)}
            <hr/>
            
          </div>
    );
  }
}