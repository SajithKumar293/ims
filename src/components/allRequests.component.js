import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authContext } from "../contexts/AuthContext";
import { getAllRequests } from '../actions/repository';
import RequestedItem from './requestedItem.component';
import {Select} from 'antd';

export default class Requests extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state={ items:[], labs:['Ahalia campus','Nila campus'], lab:"" }
    }

    componentDidMount() {
        
    }

    handleChange = (e) => {
        this.setState({lab:e});
        const {auth,userID} = this.context;
        getAllRequests(auth.data,this.state.lab).then((items) =>this.setState({ items }));
        console.log(this.state.items)
    }
  render() {
    const { items ,labs} =  this.state;
    const Option = Select;
    return (
        <div className=" container">
            <h3 className="card-title">List of Requested Items</h3>
            <Select
                showSearch
                style={{ width: 200, marginLeft:"20px" }}
                placeholder="Select lab"
                optionFilterProp="children"
                onChange={()=>this.handleChange()}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
            {labs.map((l,index) => <Option value={l}>{l}</Option>)}
            </Select>
            <hr/>
            {items.map((product, index) => <RequestedItem product={product} key={index}/>)}
            <hr/>
          </div>
    );
  }
}