import React, { Component } from 'react';
import './Menu.css';
import {  Link } from "react-router-dom";

class Menu extends Component{
  constructor(props){
      super(props);
      this.state = {
          menuVisible: true
      };
      this.showMenuHandler = this.showMenuHandler.bind(this);
  }

showMenuHandler(){
    this.setState({menuVisible: !this.state.menuVisible});
}

render(){


    return (
        <div className='menuContainer'>
            <h1 className='soundTitle'>Sound<span>Drive</span></h1>
            <nav className='nav-Container'>
                <button onClick={this.showMenuHandler} className='menuToggleBtn'>  toggle menu  </button>  
               <div className='menu-dropdown'>
                
                    <ul style={{height : this.state.menuVisible ? '0 ': '10em'}} className={this.state.menuVisible ? 'nav-menu' : 'nav-menu open-menu'}>
                        <li>
                            <Link to='/'>Magazine</Link>
                        </li>
                        <li>
                            <Link to='/Spotify'> Spotify </Link>
                        </li>
                        <li>
                            <Link to='tv'>TV</Link>
                        </li>
                    </ul> 
                    <a className='spotify-link' href='http://localhost:8888'>
                        <button className='spotify'>Connect with Spotify</button>
                    </a>
              
               </div>
                    
               
                
                
            </nav>
        </div>
    );
}    
};

export default Menu;