import React, { useEffect, useState } from "react";
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './InvSection.css';
import StockEventsTable from './StockEventsTable';
import InvOptions from './InvOptions';
import Search from './Search';

// 2 Data Types

// Products

const fetchedProducts = [
    {id: 1, code: '0', name: "Barra Torsión IZQ", cat: "Suspensión", fab: "Chevrolet", model: "Dmax", ver:"Todas", year: "2006-2014", ubicacion:"bodega", origen:"USA", nota:"",price: 40000, critic: 10, stock:20},
    {id: 2, code: '0', name: "Optico IZQ", cat: "Opticos", fab: "Mazda", model: "626", ver:"FS DOHC 16 VALV 4X2", year: "2000-2004", ubicacion:"mostrador", origen:"Japon", nota:"", price: 70000, critic: 10, stock:20},
    {id: 3, code: '0', name: "Bateria Auto 60AH 550CCA",cat: "Electricos", fab: "Hankook", model: "", ver:"", year: "", price: 64990, ubicacion:"vitrina", origen:"China", nota:"", critic: 10, stock:20}
]

// stock events

const fetchedStockEvents = [
    {id: 1, type: 'add', qty: 100, product: fetchedProducts[0]},
    {id: 2, type: 'remove', qty: -20, product: fetchedProducts[0]},
    {id: 3, type: 'remove', qty: -10, product: fetchedProducts[0]},

    {id: 4, type: 'add', qty: 120, product: fetchedProducts[1]},
    {id: 5, type: 'remove', qty: -45, product: fetchedProducts[1]},
]

const searchData = {code: '',name: '',cat: '',fab: '',model: '',ver: '',year: '',price: '',stock: ''}
const shopData = {code: '', name: '', price: 0, cant: 0}

const userName = 'test'

//fetch stock events


// separate by product
//display

class InvSection extends React.Component{

    state = {
        fetchedProducts,
        fetchedStockEvents,
        searchData,
        shopData,
        userName
    }

    handleChange = (value) => {
        // handle changes from child
        //searchData = value
        //console.log(value)
        const searchData = value
        this.setState({searchData}) //funciona por algun motivo llama de nuevo el render creo this.setSate(searchData = value)
        //console.log(searchData)
     }

    shopValues = (values) => {
        const shopData = values
        this.setState({shopData})
        //localStorage.setItem('cart-items', JSON.stringify(shopData))
        //console.log(shopData)
    }

    async componentDidMount(){

        const productsRes = await axios({
            method: 'GET', 
            //url: 'http://localhost:1337/products'
            url: 'http://localhost:8000/api/products/',
            /*auth: {
                username: 'admin@admin.com',
                password: '2021Diciembre'
              }*/
        })

        /*const stockEventsRes = await axios({
            method: 'GET', 
            url: 'http://localhost:1337/stockevents'
        })*/
        
        //console.log("App.componentDidMount stockEventsRes", stockEventsRes)
        //console.log(productsRes)
        const fetchedProducts = productsRes.data.data
        const userName = window.sessionStorage.getItem('userName')//localStorage.getItem('userName')
        //console.log(fetchedProducts)
        /*const fetchedStockEvents = stockEventsRes.data*/

        /*this.setState({fetchedProducts, fetchedStockEvents}) //searchData*/

        this.setState({fetchedProducts, userName})
    }

    
    

    render(){
        //console.log("App.render")
        //const {fetchedProducts, fetchedStockEvents, searchData, shopData} = this.state
        const {fetchedProducts, searchData, shopData, userName} = this.state
        let svalues = {} //no se actualiza porque?
        //console.log(searchData)
        //console.log(svalues)
        return (
            <div className ='inv-container'>
                <div class = 'row'>
                    <div class = 'col'><div className = "usr-cont">Bienvenido: {userName}</div></div>
                    <div class = 'col'><div className = "inv-til">Inventario</div></div>
                    <div class = 'col'></div>
                </div>
                <div className="bto"><InvOptions shopInfo = {shopData}/></div>
                <div class = "table-container">
                    <Search handleChange={this.handleChange} /> {/*svalues = {this.state.searchData}*/}
                    <StockEventsTable
                        searchValues={searchData}
                        products={fetchedProducts} 
                        stockEvents = {fetchedStockEvents}
                        shopValues = {this.shopValues}
                    />
                </div>
            </div>
        );
    }
}

export default InvSection;
