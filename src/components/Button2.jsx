import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Button2.css';
import { Link } from 'react-router-dom';


const  STYLES = ['btn2--primary', 'btn2--outline'];

const SIZES = ['btn2--medium', 'btn2--large'];

const DIRS = ['/', '/inv']


export const Button2 = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize,
    dir
    }) => {
        const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

        const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

        const checkDir = DIRS.includes(dir) ? dir : DIRS[0];

        return(
            /*<Link to ='/inv' className='btn2-mobile'> */
            <Link to = {checkDir} className='btn2-mobile'> 
                <button 
                className={`btn2 ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
                >
                    {children}
                </button>
            </Link>
        )
    };