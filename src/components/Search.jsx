/*import React from 'react';*/
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import '../App.css';
import './Search.css';



function Search(props) {

    const [initialState, setAllValues] = useState({
        code: '',
        name: '',
        cat: '',
        fab: '',
        model: '',
        ver: '',
        year: '',
        price: '',
        stock: ''
     });

     //initialSearch = allSearchValues

    const changeHandler = e => {
        //const { name, value } = e.target;
        //setAllValues({...allSearchValues, [e.target.name]: e.target.value})
        setAllValues({...initialState, [e.target.name]: e.target.value})
        //setState((prevState) => ({ ...prevState, [name]: value }));
        //console.log(allSearchValues)
    }

    useEffect(() => {
        sendValues()
      },[initialState]);

    const sendValues = e =>{
        props.handleChange(initialState)
    }

    const twoCalls = e => {
        changeHandler(e)
        sendValues()
    }

    const clearState = () => {
        //setState({ ...initialState });
        setAllValues({...initialState, code: '',name: '',cat: '',fab: '',model: '',ver: '',year: '',price: '',stock: ''})
        //console.log(initialState)
    };
        // Reset Input Field handler
    const resetInputField = () => {

        var form = document.getElementById("search-form").reset();

        //changeHandler()
        clearState()
        //console.log(initialState)
        //setState({ ...allSearchValues });
        //sendValues()
    };

    return (
        <div className = "bg-cont">
            <div className="mb-3">
                <div class = 'row2'>
                    <div class = 'colg'></div>
                    <div class = 'colinit'><div className = "search-item">Codigo</div></div>
                    <div class = 'col2'><div className = "search-item">Nombre</div></div>
                    <div class = 'col2'><div className = "search-item">Categoria</div></div>
                    <div class = 'col2'><div className = "search-item">Fabricante</div></div>
                    <div class = 'col2'><div className = "search-item">Modelo</div></div>
                    <div class = 'col2'><div className = "search-item">Versión</div></div>
                    <div class = 'col2'><div className = "search-item">Año</div></div>
                    <div class = 'col2'><div className = "search-item">Precio</div></div>
                    <div class = 'colend'><div className = "search-item">Stock</div></div>
                </div>
            </div>
            <div className="mb-3">
                <div class = 'row3'>
                    <form id = "search-form">
                        <div class = 'colbtn'>
                            <Button variant="info" size = "sm" onClick={resetInputField}>Borrar <i class="fas fa-eraser"></i></Button>
                        </div>
                        <div class = 'col3'>
                            <input type="number" className="search-input" name = "code" onChange={changeHandler}/> {/*twoCalls*/}
                        </div>
                        <div class = 'col3'>
                            <input type="text" className="search-input" name = "name" onChange={changeHandler}/>
                        </div>
                        <div class = 'col3'>
                            <input type="text" className="search-input" name = "cat" onChange={changeHandler}/>
                        </div>
                        <div class = 'col3'>
                            <input type="text" className="search-input" name = "fab" onChange={changeHandler}/>
                        </div>
                        <div class = 'col3'>
                            <input type="text" className="search-input" name = "model" onChange={changeHandler}/>
                        </div>
                        <div class = 'col3'>
                            <input type="text" className="search-input" name = "ver" onChange={changeHandler}/>
                        </div>
                        <div class = 'col3'>
                            <input type="text" className="search-input" name = "year" onChange={changeHandler}/>
                        </div>
                        <div class = 'col3'>
                            <input type="number" className="search-input" name = "price" onChange={changeHandler}/>
                        </div>
                        <div class = 'col3'>
                            <input type="number" className="search-input" name = "stock" onChange={changeHandler}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Search