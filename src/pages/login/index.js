
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import './Login.css'
import Spinner from 'react-bootstrap/Spinner'
import useUser from "hooks/useUser"

export default function Login(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const pushLocation= useHistory()
    const {isLoginLoading,hasLoginError,login, isLogged} = useUser()


    useEffect(()=> {
        if (isLogged) pushLocation.push('/inv')
    }, [isLogged, pushLocation])

    const handleSubmit= e =>{
        e.preventDefault()
        /**
        {axios.get('http://localhost:1337/users/me').then(response =>{
            console.log(response);
            console.log(response.data);
        })} */
  
        //alert(`${username}, ${password}`)
        login({username,password})
        //pushLocation.push('/inv')
    }
    return (
        <>
            {isLoginLoading && 
            <div className= 'loading'>
                
                <strong> 
                    Checking credentials...
                </strong>
                <Spinner classname = 'spinner' animation="border" />
            </div>
            }
            {!isLoginLoading &&
                <div className='Login-container'>
                    
                    
                    <div className ='Login'>
                        <div className='Login-sign-container'>
                            <h1 className = 'title'>Inicio de Sesion</h1>
                            
                            <form  className='inputs-container' onSubmit= {handleSubmit}>
                                <input className='Login-input' type='usuario'  placeholder='Usuario' onChange={e=> setUsername(e.target.value)} value = {username}/>
                                <input className='Login-input' type='password' placeholder='Contraseña' onChange={e => setPassword(e.target.value)} value={password}/>
                                <button className = 'Login-btn'> Iniciar Sesion </button>
                                <p>Olvidaste tu contraseña? <span className='span'>Click aqui</span> </p>
                                {
                                    hasLoginError &&  <i className = 'message-invalid'>Usuario o contraseña incorecta!</i>
                                }
                            
                            </form>

                        </div>
                        
                        <div className='login-image' >
                            
                        </div>
                        
                        {/*
                        <div className = 'Login Login__info'>
                            <p> bla bla bla bla bla</p>
                        </div>
                        */}
                    </div>

                </div>
            }

        </>
    )
}