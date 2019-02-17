import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class  Header extends React.Component{

    render(){
        return(

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="http://www.majidalfuttaim.com">MAF</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink  className="nav-link" to="/" activeClassName="active" exact path="/">Login</NavLink>
                    <NavLink  className="nav-link" to="/Home" activeClassName="active" exact path="/Home">Home</NavLink>
                    <NavLink  className="nav-link" to="/CampaignOverview" activeClassName="active" exact path="/CampaignOverview">Overview</NavLink>
                    <NavLink  className="nav-link" to="/CampaignDeepdive" activeClassName="active" exact path="/CampaignDeepdive">Deepdive</NavLink>
                </Nav>
            </Navbar>

        );
    }

}

export default Header;
