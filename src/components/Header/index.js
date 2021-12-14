
import React, { useState,useEffect } from "react";
import useUser from "hooks/useUser";
import { Link } from "react-router-dom";
import './header.css'
import { useHistory } from "react-router-dom"

export default function Header(){
    //const isLogged = true
    const [isActive, setActive] = useState(false)
    const pushLocation= useHistory()
    const {userName,isLogged,logout} = useUser()



    const handleClick = e =>{
        e.preventDefault()
        alert(`${userName}`)
        console.log('estado de loged antes de cerrar sesion',isLogged)
        logout()
        console.log('estado de loged despues de cerrar sesion', isLogged)
        pushLocation.push('/')
    }
    const toggleClassName = () =>{
        
        setActive(!isActive)
        console.log(isActive)
    }
    
    return(
        <header className= 'app-header'>
            {
                isLogged
                    // este seria el navBar una vez iniciada la sesion
                    ? <div className= 'header-container'>
                        <div className= 'navbar-container'>
                            <div className='nav-logo' >
                                Valrepuestos<i className="fab fa-typo3"/>
                            </div>
                            <div>
                                {/*<i className='mensaje-bienvenido'> Hello, {userName}! </i>*/}
                            </div>
       
                            <button className= 'nav-menu-icon' onClick = {toggleClassName}>
                                <i className='fas fa-bars' />
                            </button>

                            <ul className={isActive? 'nav-menu nav-menu_active': 'nav-menu'}>
                            
                            
                                <li className='nav-menu-item'>
                                    <Link to='/inv' className='nav-links'>
                                        INICIO
                                    </Link>
                                </li>
                                <li className='nav-menu-item'>
                                    <Link to='/inv' className='nav-links' >
                                        INVENTARIO
                                    </Link>
                                </li>
                                <li className='nav-menu-item'>
                                    <Link to='/cart' className='nav-links' >
                                        CONFIGURACIÓN
                                    </Link>
                                </li>
                                
                                <button className = 'nav-btn' onClick={handleClick}>CERRAR SESION</button>
                                
                            </ul>
                            
                            
                        </div>


                       
                    </div>
                        

                    // navbar antes del login
                    : <nav className= 'header-container'>
                        <div className= 'nav-logo'>
                            Valrepuestos<i className="fab fa-typo3"/>
                        </div>
                    </nav>
            }
        </header>
    )

}