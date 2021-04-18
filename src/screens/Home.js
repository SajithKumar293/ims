import React,{ useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "../components/navbar.component"
import Footer from "../components/footer.component"
import Profile from "../components/profile.component"
import MyItems from '../components/myItems.component';
import AvailableItems from "../components/availableItems.components";
import Requests from "../components/allRequests.component"
import { authContext } from '../contexts/AuthContext';
import Cart from '../components/cart.component';
import Checkout from '../components/checkout.component';

const Home = () => {
  const [showStudent, setShowStudent] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showSupplier, setShowSupplier] = useState(false);

  const {role} = useContext(authContext); 

  useEffect(() => {
    if (role.data==='ADMIN'){
      setShowAdmin(true)
    }
    else if (role.data==='SUPPLIER') {
      setShowSupplier(true)
    } 
    else {
      setShowStudent(true)
    }
    },[role.data]);
  
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component={Profile}/>
      { showStudent && ( <Route path="/my-items" component={MyItems} /> )}
      { showStudent && ( <Route path="/available-items" component={AvailableItems} /> )}
      { showStudent && ( <Route path="/cart" component={Cart} /> )}
      { showStudent && ( <Route path="/checkout" component={Checkout} /> )}
      { showSupplier && ( <Route path="/all-requests" component={Requests} /> )}
    </Router>
  );
};

export default Home;