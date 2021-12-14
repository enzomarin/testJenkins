import { useCallback, useContext, useEffect, useState} from "react"
import Context from "context/UserContext"
import loginService from 'services/login'


export default function useUser(){
    const {jwt, setJWT} = useContext(Context)
    const [state, setState] = useState({loading : false, error:false, name:''})
   
    
    useEffect(() => {
      },[jwt, state]);

    const login = useCallback(({username,password}) =>{
        setState({loading:true, error:false})
        //console.log('pasword desde useUser: ', password);
        //console.log('tipo',typeof(password));
        loginService(username,password)
            .then(jwt =>{
                window.sessionStorage.setItem('jwt',jwt)
                setState({loading:false, error:false, name:username})
                console.log('jwt desde useUser',jwt)
                setJWT(jwt)
                //localStorage.setItem('userName', username)
                window.sessionStorage.setItem('userName', username)
            })
            .catch(err =>{
                window.sessionStorage.removeItem('jwt')
                setState({loading:false, error:true})
                //localStorage.removeItem('userName')
                window.sessionStorage.removeItem('userName')
                console.log('error en el servicio de login!!!');
                console.error(err)
            })
    },[setJWT])

    const logout = useCallback(()=>{
        window.sessionStorage.removeItem('jwt')
        console.log('jwt antes de cerrar sesion: ', jwt );
        setJWT(null)
        localStorage.removeItem('userName')
        console.log('jwt despues de cerrar sesion: ', jwt );
    }, [setJWT,jwt])


    return{
        userName: state.name    ,
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }
}