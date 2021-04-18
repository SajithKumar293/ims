import React,{ Component}  from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../actions/repository';
import { authContext } from "../contexts/AuthContext";
import CartItem from './cartItem.component';

export default class Cart extends Component {
    static contextType = authContext;  
    constructor(props) {
        super(props);
        this.state = { products: [] };
        this.removeFromCart = this.removeFromCart.bind(this);
        this.clearCart = this.clearCart.bind(this);
    }

    componentDidMount() {
        const {auth} = this.context;
        let cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
        if (!cart) return; 
        getCartProducts(auth.data,cart).then((products) => {
        this.setState({ products });
        console.log(products);
        });
    }

  removeFromCart = (product) => {
    let products = this.state.products.filter((item) => item.id !== product.id);
    let cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[product.id];
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({products});
  }

  clearCart = () => {
    localStorage.removeItem('cart');
    this.setState({products: []});
  }

  render() {
    const { products} =  this.state;
    return (
      <div className=" container">
        <h3 className="card-title">Cart</h3>
        <hr/>
        {
          products.map((product, index) => 
            <CartItem product={product} remove={this.removeFromCart} key={index}/>)
        } <hr/>
        { !products.length ?<h3 className="text-warning">No item on the cart</h3>: ''}
        <Link to="/checkout">
            <button className="btn btn-success float-right">Checkout</button></Link>
        <button className="btn btn-danger float-right" onClick={this.clearCart} 
            style={{ marginRight: "10px" }}>Clear Cart</button><br/><br/><br/>
      </div>
    );
  }
}