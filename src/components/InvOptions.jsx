import React from 'react';
import axios from 'axios';
import StockEventsTable from './StockEventsTable';
import { Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../App.css';
import './InvSection.css';


function InvOptions(props) {

    const {shopInfo} = props

    return (
        <>    
        <div className="bt4">
            <Link to="/cart">
            {/*<Link 
                to={{pathname:"/cart",
                    state: shopInfo
                }}>*/}
                <Button variant="primary" size="lg"> 
                    <div className = "btcontent">
                        <div className="btext"><b>Ver Carrito</b></div>
                        <div className="bti"><i class="fas fa-shopping-basket fa-3x"/></div>
                    </div>
                </Button>
            </Link>
        </div>
        <div className="mb-2">
            <div className="bt3">
                <Link to="/ingreso">
                    <Button variant="secondary" size="md">Ingresar Productos</Button>
                </Link>
            </div>
            <div className="bt3">
                <Button variant="warning" size="md">Bajos en Stock</Button>
            </div>
            <div className="bt3">
                <Button variant="success" size="md">Exportar</Button>
            </div>
        </div>
        </>
    )
}

export default InvOptions
