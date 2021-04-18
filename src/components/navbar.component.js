import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import { authContext } from "../contexts/AuthContext";
import {ShoppingCartOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

export default class Navbar extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state={
            showStudent:false,
            showSupplier:false,
            showAdmin:false
        }
      }
      componentDidMount() {
        const {role} = this.context;
        if (role.data==='ADMIN'){
            this.setState({showAdmin: true})
        }
        else if (role.data==='SUPPLIER') {
            this.setState({showSupplier: true})
        } 
        else {
            this.setState({showStudent: true})
        }
      }

  render() {
    const {setAuthData} = this.context;   
    return (
        <div id="header" className="header">
            <nav className="navbar navbar-expand-lg navbar-light text-capitalize">
                <div className="container">
                <a href="#"><img className="logo" src="logo.png" alt="#" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#show-menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="show-menu">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                            </li>

                            { this.state.showStudent && (
                                <li className="nav-item">
                                <a className="nav-link" href="/my-items">My Items</a>
                                </li> )}
                            { this.state.showStudent && (    
                                <li className="nav-item">
                                <a className="nav-link" href="/available-items">Available Items</a>
                                </li> )}

                            { this.state.showStudent && (    
                            <li className="nav-item">  
                            <a className="nav-link" href="/cart"><ShoppingCartOutlined style={{ fontSize:"30px"}}/></a>
                            </li> )}   

                            { this.state.showSupplier && (
                                <li className="nav-item">
                                <a className="nav-link" href="/all-requests">Requests</a>
                                </li> )}

                            <li className="nav-item">
                            <Button
                                variant="primary"
                                type="button"
                                className="w-100 mt-3"
                                onClick ={ () => {
                                    setAuthData(null);
                                } }
                                >
                                Log out
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
  }
}