import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Row, Col, Container} from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "./Authcontext"
import "./App.css"
function Feed(){
    const myContext=useContext(AuthContext)
    const [messages, setMessages]=useState([])
 const navigate=useNavigate()
 
    
    useEffect(()=>{
        if(myContext.loginStatus==false){
            navigate("/")
        }

        async function getmessages(){
            var result=await axios.post("http://localhost:3000/getmessages", {token:sessionStorage.getItem("token")})
            if(result.data.messages){
                setMessages(result.data.messages)
            }else{
                navigate("/")
            }
            
            
        }
        getmessages()
        console.log(messages.map((msg)=>msg.message))

    },[])
    


    return (
    
    <>
    <Container>
    <Row>
          <Col>
            <p className="title">TBH</p>
          </Col>
        </Row>
        <Row >
        {messages.map((msg)=>{
            return(
                <>
                
                <Col lg={3} className="messagecol d-flex justify-content-center">
                    <div className="outerdiv">
                        {msg.message}
                    </div>
                </Col>
                
                </>
            )
        })}
        </Row>
    </Container>
        
    
    </>)
}

export default Feed;