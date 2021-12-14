import React, {useState} from "react";

const Context = React.createContext({})

export function UserContextProvider({children}){
    // en este context tenemos el estado jet el cual lo podremos compartir en toda la aplicacion
    const [jwt, setJWT] = useState(
        ()=> window.sessionStorage.getItem('jwt')
    )

    return<Context.Provider value={{jwt,setJWT}}>
        {children}
    </Context.Provider>
}

export default Context