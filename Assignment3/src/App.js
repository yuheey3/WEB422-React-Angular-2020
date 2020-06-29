/*********************************************************************************
* WEB422 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Yuki Waka         Student ID: 141082180     Date: June 28,2020
*
********************************************************************************/

import React from 'react';
import './App.css';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Sales from './Sales';
import Sale from './Sale';
import NotFound from './NotFound';

class App extends React.Component {
  //constructor 
  constructor(props) {
    super(props);
    this.state = {
      recentlyViewed: [],
      searchId: ""
    }
    //bound
    this.viewedSale = this.viewedSale.bind(this);
    this.updateSearchId = this.updateSearchId.bind(this);
  }
  //pushs the value of 'id' into the 'recentlyviewed'array
  //updates the state with the updated array
  viewedSale(id) {
    if (this.state.recentlyViewed.indexOf(id) === -1) {
      this.setState({
        recentlyViewed: [...this.state.recentlyViewed, id]
      })
    }
  }
  //updates the value of "searchId"in the state
  updateSearchId(e) {
    this.setState({
      searchId: e.target.value
    });
  }
  //render
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect staticTop>
          <Navbar.Header>
            <LinkContainer to="/">
              <Navbar.Brand>
                WEB422 - Sales
          </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/Sales">
                <NavItem> All Sales</NavItem>
              </LinkContainer>
              <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
                {this.state.recentlyViewed.length > 0 ?
                  this.state.recentlyViewed.map((id, index) => (
                    <LinkContainer to={`/Sale/${id}`} key={index}>
                      <MenuItem>Sale: {id}</MenuItem>
                    </LinkContainer>)) :
                  <MenuItem> ... </MenuItem>}
              </NavDropdown>
            </Nav>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl type="text" onChange={this.updateSearchId} placeholder="Sale ID" />
              </FormGroup>{''}
              <Link className="btn btn-default" to={"/Sale/" + this.state.searchId}>Search</Link>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <Grid>
          <Row>
            <Col md={12}>
              <Switch>
                <Route exact path="/" render={() => (
                  <Redirect push to={"/Sales"} />
                )} />
                <Route exact path="/Sales" render={() => (
                  <Sales />
                )} />
                <Route path="/Sale/:id" render={(props) => (
                  <Sale id={props.match.params.id} viewedSale={this.viewedSale} />
                )} />
                <Route render={() => (
                  <NotFound />
                )} />
              </Switch>
            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}




export default App;
