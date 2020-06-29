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
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';

class Sale extends React.Component {
    //constructor
    constructor(props) {
        super(props);
        this.state = {
            sale: {},
            loading: true
        };
        //bound
        this.itemTotal = this.itemTotal.bind(this);
    }
    componentDidMount() {
        fetch(`https://infinite-castle-72482.herokuapp.com/api/sales/${this.props.id}`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                if (myJson._id) {
                    this.props.viewedSale(myJson._id);
                }

                this.setState({
                    sale: myJson,
                    loading: false
                });
            });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ loading: true });

            fetch(`https://infinite-castle-72482.herokuapp.com/api/sales/${this.props.id}`)
                .then((response) => {
                    return response.json();
                })
                .then((myJson) => {
                    if (myJson._id) {
                        this.props.viewedSale(myJson._id);
                    }

                    this.setState({
                        sale: myJson,
                        loading: false
                    });
                });
        }
    }
    //caluculate total items
    itemTotal(items) {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            total += (items[i].price * items[i].quantity);
        }
        return total;
    }
    render() {
        if (this.state.loading) {
            return null; 
        } else {
            if (this.state.sale._id) {
                return (
                    <div>
                        <h1>Sale: {this.state.sale._id}</h1>
                        <h2>Customer</h2>
                        <ListGroup>
                            <ListGroupItem><strong>email:</strong> {this.state.sale.customer.email}</ListGroupItem>
                            <ListGroupItem><strong>age:</strong> {this.state.sale.customer.age}</ListGroupItem>
                            <ListGroupItem><strong>satisfaction:</strong> {this.state.sale.customer.satisfaction} / 5</ListGroupItem>
                        </ListGroup>
                        <h2> Items: ${this.itemTotal(this.state.sale.items).toFixed(2)}</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sale.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>);
            } else {
                return <div><h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>
            }
        }
    }
}

export default Sale;
