import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    
      }
      componentDidMount() {

      }

  render() {
    return (
        <footer>
         <div class="container">
            <div class="row">
               <div class="col-lg-3 col-md-6 col-12">
                  <div class="footer_blog_section">
                     <img src="iitpkdlogo.jpg" alt="#" style={{width:"50%",height:"50%"}}/>
                  </div>
               </div>
               <div class="col-lg-2 col-md-6 col-12">
                  <div class="item">
                     <h4 class="text-uppercase">Navigation</h4>
                     <ul class="menu">
                        <li><a href="#">Footer Item</a></li>
                        <li><a href="#">Footer Item</a></li>
                        <li><a href="#">Footer Item</a></li>
                        <li><a href="#">Footer Item</a></li>
                        <li><a href="#">Footer Item</a></li>
                        </ul>
                  </div>
               </div>
               <div class="col-lg-4 col-md-6 col-12">
                  <div class="item">
                     <h4 class="text-uppercase">Contact Info</h4>
                     <p><strong><span class="glyphicon glyphicon-map-marker"></span>Corporate Office Address:</strong></p>
                     <p> &emsp;Indian Institute of Technology Palakkad,<br/>&emsp;
                            Ahalia Integrated Campus,<br/>&emsp;
                            Kozhippara P. O | Palakkad,<br/>&emsp;
                            Kerala | Pin: 678557
                     </p>
                     <p><span class="glyphicon glyphicon-phone-alt"></span> 04923 226 300 (Office)</p>
                  </div>
               </div>
               <div class="col-lg-3 col-md-6 col-12">
                  <div class="item">
                     <h4 class="text-uppercase">Discover</h4>
                     <ul>
                        <li><a href="#">Help</a></li>
                        <li><a href="#">How It Works</a></li>
                        <li><a href="#">Subscribe</a></li>
                        <li><a href="#">Contact Us</a></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <div class="copyright text-center">
            <p>2020 Inventory Management System</p>
         </div>
         </footer>
       );
    }
  }