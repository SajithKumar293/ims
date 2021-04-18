import React from 'react';
import {Alert} from 'antd';

export default class MyItem extends React.Component {
      constructor(props) {
        super(props);
        this.state = {quantity: 1}
      }


      render(){
        const { product } = this.props;
        return (
         <div className="card" style={{ marginBottom: "10px"}}>
           <div className="card-body">
             <h4 className="card-title">{product.itemName}</h4>
             <p className="card-text">Quantity: {product.quantity}</p>
             <span className="card-text">
               <small>Status: </small>{product.approved?<Alert message="Success Tips" type="success" showIcon />:<Alert message="Pending" type="warning" showIcon />}
             </span>
          </div>
        </div>
       )
     }
    }