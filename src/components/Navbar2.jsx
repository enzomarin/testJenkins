import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar1.css';
import { Button2 } from './Button2';
import { useNavigate } from 'react-router-dom'   

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(() =>{
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar2'>
                <div className='navbar-container'>
                    <div className='navbar-logo' >
                        Valrepuestos<i className="fab fa-typo3"/>
                    </div>
                    
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                      </div>
                    
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/inv' className='nav-links' onClick={closeMobileMenu}>
                                INICIO
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/inv' className='nav-links' onClick={closeMobileMenu}>
                                INVENTARIO
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/cart' className='nav-links' onClick={closeMobileMenu}>
                                CONFIGURACIÓN
                            </Link>
                        </li>
                        <li className='nav-item'>
                            {!button && <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                CERRAR SESIÓN
                            </Link>}
                        </li>
                    </ul>
                    {/*{button && <Button buttonStyle='btn--outline'>CERRAR SESIÓN</Button>}*/}
                    {/*{button && <Button2 dir = '/' buttonStyle='btn2--outline'><Link to='/' className='nav-links2'>CERRAR SESIÓN</Link></Button2>}*/}
                    {button && <Button2 dir = '/' buttonStyle='btn2--outline'>CERRAR SESIÓN</Button2>}
                </div>
            </nav>
        </>
    );
}

export default Navbar
