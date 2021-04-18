import React from 'react';
import { getCartProducts, createBorrowRequest } from '../actions/repository';
import { Link, Redirect } from 'react-router-dom';
import { authContext } from "../contexts/AuthContext";
import 'antd/dist/antd.css';
import { Select, Row, Col, message } from 'antd';

export default class Checkout extends React.Component {
  static contextType = authContext; 
  constructor(props) {
    super(props);
    this.state = { products: [], Advisors: [], labs:[], advisor:"", lab:"", option:{} }
    this.checkout = this.checkout.bind(this);
  }

  componentDidMount() {
    const {auth} = this.context; 
    this.setState({option:Select}); 
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) return; 
    getCartProducts(auth.data,cart).then((products) => {
      this.setState({ products});
    });
    const Advisors = ['Advisor 1','Advisor 2', 'Advisor 3'];
    this.setState({Advisors});  
    const labs = ['Ahalia campus','Nila campus'];
    this.setState({labs});  
  }

  checkout = () => {
        if (!(this.state.lab && this.state.advisor)){
          return message.warning('Invalid Faculty Advisor or Lab');
        }
        const {auth,userID} = this.context; 
        createBorrowRequest(auth.data,userID.data,this.state.products,this.state.lab,this.state.advisor);
        localStorage.removeItem('cart');
        this.setState({products:[]});
        message.success('Successfully placed borrow request!');
        <Redirect to="/available-items" />
        return <Redirect to="/available-items" />
  }

  render() {
    //if (!isAuthenticated()) return (<Redirect to="/login" />);
    const { products,Advisors,labs} =  this.state;
    const {Option} = Select;
    return (
    <div className=" container">
      <h3 className="card-title">Checkout</h3>
      <Row>
      <Col span={12}>
        <label>Select your F.A</label>  
        <Select
            showSearch
            style={{ width: 200, marginLeft:"20px" }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={(e)=>{this.setState({advisor:e})}}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
           {Advisors.map((l,index) => <Option value={l}>{l}</Option>)}
        </Select>
      </Col>
      <Col span={12}>
      <label>Select Lab for pickup</label>  
        <Select
            showSearch
            style={{ width: 200, marginLeft:"20px" }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={(e)=>{this.setState({lab:e})}}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
           {labs.map((l,index) => <Option value={l}>{l}</Option>)}
        </Select>
      </Col>
    </Row>
      <hr/>
      { products.map((product, index) => 
          <div key={index}>
          <p>{product.name} <small> (quantity: {product.qty})</small>
          </p><hr/>
          </div>
      )} <hr/>
      { !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
      { products.length ? <button className="btn btn-success float-right" 
      onClick={this.checkout} >Confirm Checkout</button> : '' }
      <Link to="/cart"><button className="btn btn-danger float-right" 
        style={{ marginRight: "10px" }}>Cancel</button></Link><br/><br/><br/>
    </div>
    );
  }
}
