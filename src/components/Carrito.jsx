import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import '../App.css';
import './Carrito.css';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Carrito(props){
   
    //const { state } = useLocation();
    //console.log(state)
    /*const testData = [
        {code: "1234", name:"hola", price:99,cant:2},
        {code: "1333", name:"chao", price:69,cant:1}
    ]*/
    const [username, setName] = useState(window.sessionStorage.getItem('userName'))
    const [testProducts, setValues] = useState([])
    let localCart = localStorage.getItem('cart-items');
    //let localCart = localStorage.getItem('cart');
    //console.log(testProducts)
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    const [productsToModified, setModifiers] = useState([
        {id: 1, code: '0', name: "test", cat: "test", fab: "test", model: "test", ver:"test", year: "0000-0000", ubicacion:"test", origen:"test", nota:"",price: 1, critic: 10, stock:20},
    ])
    


    let subtotal = 0

    const setDisc = (e) => {
        console.log("setdisc")
        let minus = 0
        const val = e//.target.value
        const max = 100
        const maxLength = max.toString().length-1
        const newVal = val < max ? val : parseInt(val.toString().substring(0, maxLength))
        setDiscount(newVal)
        if (newVal!=0){
            console.log("testdisc")
            minus = total*(newVal/100)
            setTotal(Math.round(total-minus))
        }
        /*else{
            setTotal(total)
        }*/  
    }

    function submitChanges(e, c){
        console.log(e)
        let posible = true
        e.map((a) => {
            let retData = c.find(element => element.code == a.code)
            if (retData.stock < a.cant){
                alert(a.name + " PRODUCTO NO POSEE SUFICIENTE STOCK")
                posible = !posible
            }
        })
        if(posible){
            e.map((a) => {
                //console.log('http://localhost:800/api/products/'+a.id)
                //console.log(c)
                let retData = c.find(element => element.code == a.code)
                //console.log(retData)
                axios.patch('http://localhost:8000/api/products/'+a.id,{
                    stock: retData.stock - a.cant
                }).then(response =>{
                    console.log(response)
                })
            })
            removeItems() 
        }    
    }

    const setCount = (ee, e) => {
        ee.cant = e
    }

    const getProducts = async () =>{
        //console.log("test")
        //console.log(localCart)
        const undProducts = []
        testProducts.map(async (e) =>{
            /*const response = await axios.get('http://localhost:8000/api/products',{
                params: {
                    code: e.code
                }
            })
            undProducts.push(response.data[0])*/
            const response = await axios.get('http://localhost:8000/api/products/code/'+e.code,{})
            //console.log(response.data.data)
            undProducts.push(response.data.data)
            console.log("item obtenido")
        })
        //console.log(undProducts)
        setModifiers(undProducts)
    }

    useEffect(() => {
        
        localCart = JSON.parse(localCart);
        //console.log(localCart)
        if(localCart){
            //console.log("recuperado")
            if(localCart.length > 0 && localCart[0].name!==''){
                setValues(localCart)
                getProducts()
            }else
                setValues([])
        }else{
            setValues([])
        }
        //getProducts()
   
    },[]);

    useEffect(() => {
        setTotal(testProducts.reduce((accumulator, currentElement) => {
            return accumulator + currentElement.price*currentElement.cant
        }, 0))
        setDiscount(0)
        //if(testProducts.length>0) localStorage.setItem('cart-items', JSON.stringify(testProducts))
        localStorage.setItem('cart-items', JSON.stringify(testProducts))
        getProducts()
        console.log(testProducts)
      },[testProducts]);

    useEffect(() =>{
    },[productsToModified])
  

    const decrementCount = (e) => {
        //console.log(e)
        if (e.cant > 0) setCount(e, e.cant - 1);
        setValues([...testProducts])
      }
    
    const incrementCount = (e) => {
        //console.log(e)
        if (e.cant < 999) setCount(e, e.cant + 1) //if (e.cant < 999) setCount(e, e.cant + 1);
        setValues([...testProducts])
      }

    const handleRemoveItem = code => {
        setValues(testProducts.filter(item => item.code !== code))
    }

    const removeItems = () => {
        //setDiscount(0)
        //localStorage.removeItem('cart-items')
        setValues([])
        //localStorage.setItem('cart-items', JSON.stringify(testProducts))
        //setSoD(saveOrDel+1)
        //console.log("borrado")
    }
   
    return (
        <div className="shopContainer">
            <div class = 'row-s'>
                <div class = 'col-s'><div className = "usr-cont">Vendedor: {username}</div></div>
                <div class = 'col-s'><div className = "shop-til">Carrito</div></div>
                <div class = 'col-s'></div>
            </div>

            <div className="space-shop">
                <div className="SelectedCont">
                    <div className="twoButtons">
                        <Button variant="danger" id="custom" onClick={removeItems}>Vaciar Carro</Button>
                        <Link to="/inv"><Button variant="dark" id="custom">Seguir Venta</Button></Link>
                    </div>
                    <Table border hover>
                        <tbody>
                            <tr id="titulos">
                                <th>#</th>
                                <th>Codigo</th>
                                <th id="nombre">Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>{' '}</th>
                            </tr>
                            {testProducts.map((element, i) => {
                                subtotal = subtotal + element.price*element.cant
                                //setTotal(subtotal)
                                return(
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{element.code}</td>
                                        <td id="nombre">{element.name}</td>
                                        <td>$ {element.price}</td>
                                        <td>
                                            <div className = "ajuste" /*class="container"*/>                                                
                                                <button id="decrement" onClick={()=>decrementCount(element)}> - </button>
                                                <input id = "my-input" readOnly type="number" name="cant" value={element.cant} onChange={(e) => {element.cant = e.target.value;setValues([...testProducts]);}}/> 
                                                {/*onChange={event => {setCount(event.target.value);}}*/}
                                                <button id="increment" onClick={()=>incrementCount(element)}> + </button>
                                            </div>
                                            {/*count*/}
                                        </td>
                                        <td>$ {element.price*element.cant}</td>
                                        <td><Button variant="outline-light" id="boton" onClick={() =>handleRemoveItem(element.code)}><i class="fas fa-window-close fa-lg"></i></Button></td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </Table>
                </div>
                <div className="right-space">
                    <div className="proceso">
                        <h1>TOTAL</h1>
                        <div className="final">
                            <div class="item-1">Aplicar Descuento</div>
                            <div class="item-2">
                                <div className="enserionecesitoesto">
                                    <div>
                                        <input id="cantidad" type="number" value = {discount} onChange={event => {setDisc(event.target.value);}}/>
                                    </div>
                                    <div className="porcentaje"> %</div>
                                </div>
                            </div>
                            <div class="item-3"><b>Subtotal</b></div>  
                            <div class="item-4">$ {total}</div>
                            <div class="item-5"><b>Total</b></div> 
                            <div class="item-6">$ {total}</div>
                            <div class="item-8"><Button onClick={()=>submitChanges(testProducts, productsToModified)} variant="success" size="lg">Procesar Venta <i class="fas fa-chevron-right fa-lg"></i></Button></div> 
                        </div>
                    </div>
                </div>
            </div>


        </div>     
    );
}

export default Carrito;