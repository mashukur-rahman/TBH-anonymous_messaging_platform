import { useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext=createContext()

function Authcontext({children}){
    const [loggedin, setLoggedin]=useState(false)
    const [username,setUsername]=useState("")
    

    function login(token){
   
        sessionStorage.setItem("token", token)

        setLoggedin(true)

        setUsername(jwtDecode(sessionStorage.getItem("token")).username)
     
    }
    return(

        <>
        <AuthContext.Provider value={{loginStatus:loggedin, username:username, login:login}}>
            {children}
        </AuthContext.Provider>
        </>
    )


}

export default Authcontext;




