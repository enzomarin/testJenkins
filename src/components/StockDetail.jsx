//import React from "react";
import React, { useEffect, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

//class StockDetail extends React.Component{

function StockDetail(props){

    const [show, setShow] = useState(false)
    const [value, setValue] = useState(1)

    const setValid = (e) => {
        //console.log("comprobando")
        let minus = 0
        const val = e//.target.value
        const max = 100
        const maxLength = max.toString().length-1
        const newVal = val < max ? val : parseInt(val.toString().substring(0, maxLength))
        setValue(newVal)
    }

    //render(){
        /*const {id, code, name, cat, fab, model, ver, year, price, total, ubicacion, origen, nota, stockEvents} = this.props*/
        const {id, code, name, cat, fab, model, ver, year, price, stock, nota, ubicacion, origen, stockEvents} = props//his.props
        //const {show} = this.state
        return(
            <>
            <tr className="StockDetail" onClick={() => setShow(!show)}> {/*<tr className="StockDetail" onClick={() => this.setState({show: !show})}>*/}
                {/*<h2>Product: {name} | Total: {total}</h2>*/}
                <td>{id}</td>
                <td>{code}</td>
                <td>{name}</td>
                <td>{cat}</td>
                <td>{fab}</td>
                <td>{model}</td>
                <td>{ver}</td>
                <td>{year}</td>
                <td>{price}</td>
                <td>{stock}</td>
            </tr>
            {show &&
                <tr>
                    <td colspan = "10" id="especial">
                        <div className = "StockEventTable__Card">
                            <div className = "container_card">
                                <div className = "e1">
                                    <b>Nota:</b>
                                    <div className = "et">{nota}</div>{/*nota*/}
                                </div>
                                <div className = "e1">
                                    <p><b>Ubicación:</b> {ubicacion}</p>{/*ubicacion*/}
                                    <p><b>Origen:</b> {origen}</p>{/*origen*/}
                                </div>
                                <div className = "e1">
                                </div>
                                <div className = "e2">
                                    <div className = "bt1">
                                        <div className = "bt1c">
                                            <div className = "nCont">
                                                <input id="my-input2" type="number" value={value} onChange={event => {setValid(event.target.value);}}/>{/*this.state.value this.handleChange*/}
                                            </div>
                                        </div>
                                        <div className = "bt1c">
                                            <ButtonGroup vertical>
                                                <Button variant="success" size="md" onClick={() => props.addItem(code, name, price, value, id)}>
                                                    <div className = "btinfo">
                                                        <div className="btext"><b>Agregar al Carro</b></div>
                                                        <div className="bti"><i class="fas fa-cart-plus fa-2x"/></div>
                                                    </div>
                                                </Button>
                                                <br />
                                                <Button variant="secondary" size="md">
                                                    <div className = "btinfo">
                                                        <div className="btext"><b>Editar</b></div>
                                                        <div className="bti"><i class="fas fa-edit fa-2x"/></div>
                                                    </div>
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            }
            </>
            
        )
    //}
}

export default StockDetail;