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
import { withRouter } from 'react-router-dom';
import { Table, Pagination } from "react-bootstrap";

class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            currentPage: 1
        };
        //bound
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    getData(page) {
        fetch(`https://infinite-castle-72482.herokuapp.com/api/sales?page=${page}&perPage=10`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ sales: myJson });
            });
    }
    //call 'getData' mehtod with the value of 'currentPage' and when it is complete,
    //update the sales value in the state with the data
    componentDidMount() {
        this.setState(this.getData(this.state.currentPage));
    }
    //previous page
    previousPage() {
        if (this.state.currentPage > 1) {
            this.getData(this.state.currentPage - 1);
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }
    //next page
    nextPage() {
        this.getData(this.state.currentPage + 1);
        this.setState({ currentPage: this.state.currentPage + 1 });
    }
    //render
    render() {
        if (this.state.sales.length > 0) {
            return (
                <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Store Location</th>
                                <th>Number of Items</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales.map((sales) => (
                                <tr key={sales._id} onClick={() => { this.props.history.push(`/Sale/${sales._id}`) }}>
                                    <td>{sales.customer.email}</td>
                                    <td>{sales.storeLocation}</td>
                                    <td>{sales.items.length}</td>
                                    <td>{new Date(sales.saleDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={this.previousPage} />
                        <Pagination.Item>{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next onClick={this.nextPage} />
                    </Pagination>
                </div>
            );
        } else {
            return null; 
        }
    }
}


export default withRouter(Sales);