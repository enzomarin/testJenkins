import axios from "axios"

const ENDPOINT = 'http://localhost:8000'

export default function login (username, pass){
    console.log(username);
    console.log('pasword: ', pass);
    console.log('tipo',typeof(pass));

    
    const getResponse = async () =>{
        const res = await axios.post(`${ENDPOINT}/api/api-token-auth/`,{
                //identifier: 'enzom',
                //password: 'aAenzom',
                username: username,
                password: pass,
            })
            /** 
            .then(res =>{
                console.log('Well done!');
                console.log('User profile', res.data.user);
                console.log('User token', res.data.jwt);
                return res.data.jwt
            })
            .then(res =>{
                console.log('JWT desde la funcion login:');
                console.log(res);
            })
            .catch(e =>{
            console.log('An error ocurred: ', e.response);
        
            })
            */
        return res.data.token
    }   
    const jwt = getResponse()
    console.log("jwt desde login:");
    console.log(jwt);
    return jwt
    
}
