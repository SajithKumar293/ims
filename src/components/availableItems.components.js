import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authContext } from "../contexts/AuthContext";
import { getItems } from '../actions/repository';
import Item from './item.component';

export default class AvailableItems extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state={
            items:[]
        }
    }

    componentDidMount() {
        const {auth} = this.context;
        getItems(auth.data).then((items) =>this.setState({ items }));  
    }

  render() {
    const { items } =  this.state;
    return (
        <div className=" container">
            <h3 className="card-title">List of Available Products</h3><hr/>
          {items.map((product, index) => <Item product={product} key={index}/>)}
            <hr/>
            <Link to="/checkout">
              <button className="btn btn-success float-right">Checkout</button>
            </Link>
            <Link to="/cart">
              <button className="btn btn-primary float-right" 
                  style={{  marginRight: "10px" }}>View Cart</button>
            </Link><br/><br/><br/>
          </div>
    );
  }
}