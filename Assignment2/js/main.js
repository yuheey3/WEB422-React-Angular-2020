/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Yuki Waka         Student ID: 141082180     Date: June 12,2020
*
********************************************************************************/

//declare varialbles and functions
let saleData = [];
let page = 1;
const perPage = 10;

//template for sale table
const saleTableTemplate = _.template(`<% saleData.forEach(function(sales){ %>
    <tr data-id="<%- sales._id %>">
        <td><%- sales.customer.email %></td>
        <td><%- sales.storeLocation %></td>
        <td><%- sales.items.length %></td>
        <td><%- moment.utc(sales.saleDate).local().format('LLLL') %></td>
    </tr>
<% }); %>`);


//template for model body
const saleModelBodyTemplate = _.template(`
<h4>Customer</h4>
<strong>email: </strong><%-sales.customer.email%><br>
<strong>age: </strong><%-sales.customer.age%><br>
<strong>satisfaction: </strong><%-sales.customer.satisfaction%> / 5
<br><br>
<h4>Items: $<%-sales.total.toFixed(2)%></h4>
<table class="table">
<thead>
    <tr>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Price</th>
    </tr>
<thead> 
<tbody>
<% sales.items.forEach(function(item){ %>
    <tr>
    <td><%- item.name %></td>
    <td><%- item.quantity %></td>
    <td>$<%- item.price %></td>
    </tr> 
 <% }); %>
 </tbody>
 </table>`);


//"fetch"request to Web APi hosted on Heroku
function loadSaleData() {
    fetch(`https://infinite-castle-72482.herokuapp.com/api/sales?page=${page}&perPage=${perPage}`).then(res => res.json())
        .then(result => {
            saleData = result;//assign the data returned to the empty array

            let rend = saleTableTemplate({ sales: result });//invoke the template with the returned data from the request and store

            $("#sale-table tbody").html(rend);
            $("#current-page").html(page);
        });
}
//grobal variable
let clickedId;

//when Dom is ready
$(function () {

    loadSaleData();

    //click event for all <tr> elements 
    $("#sale-table tbody").on("click", "tr", function () {

        clickedId = $(this).attr("data-id");//store the 'id' of the clicked row(jQuery code)

        let clickedSale = _.find(saleData, ['_id', clickedId]);//find the matching sale document within the "saleData" array

        clickedSale.total = 0;

        //assign a new property which contain total cost of all items
        for (let i = 0; i < clickedSale.items.length; i++) {
            clickedSale.total += (clickedSale.items[i].price * clickedSale.items[i].quantity);

        }
        let $modalTitle = $(".modal-title");
        $modalTitle.empty();//clear 
        $modalTitle.append(`<h4>Sales: ${clickedSale._id}</h4>`)//append to class modal-title


        let rendModel = saleModelBodyTemplate({ sales: clickedSale });
        $("#sale-modal .modal-body").html(rendModel);

        $('#sale-modal').modal({ // show the modal programmatically
            backdrop: 'static', // disable clicking on the backdrop to close
            keyboard: false // disable using the keyboard to close
        });
    });
    //click event for the "previous-page"button
    $("#previous-page").on("click", function () {
        if (page > 1)
            page--;

        loadSaleData();
    });
    //click event for the "next-page"button
    $("#next-page").on("click", function () {
        page++;

        loadSaleData();
    });

});