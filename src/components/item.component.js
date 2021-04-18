import React from 'react';

export default class Item extends React.Component {
      constructor(props) {
        super(props);
        this.state = {quantity: 1}
        this.addToCart = this.addToCart.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      }

      handleInputChange = event => 
          this.setState({[event.target.name]: event.target.value})

      addToCart = () => {
        let cart = localStorage.getItem('cart') 
                      ? JSON.parse(localStorage.getItem('cart')) : {};
        let id = this.props.product._id;
        cart[id] = (cart[id] ? cart[id]: 0);
        let qty = cart[id] + parseInt(this.state.quantity);
        if (this.props.product.availableQuantity < qty) {
          cart[id] = this.props.product.availableQuantity; 
        } else {
          cart[id] = qty
        }
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      render(){
        const { product } = this.props;
        return (
         <div className="card" style={{ marginBottom: "10px"}}>
           <div className="card-body">
             <h4 className="card-title">{product.itemName}</h4>
             <p className="card-text">{product.labName}</p>
             <span className="card-text">
               <small>Available Quantity: </small>{product.availableQuantity}
             </span>
             { product.availableQuantity > 0 ?
              <div>
                 <button className="btn btn-sm btn-warning float-right" 
                    onClick={this.addToCart}>Add to cart</button>
                 <input type="number" value={this.state.quantity} name="quantity" 
                    onChange={this.handleInputChange} className="float-right" 
                    style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
              </div> : 
              <p className="text-danger"> product is out of stock </p>
            }
          </div>
        </div>
       )
     }
    }