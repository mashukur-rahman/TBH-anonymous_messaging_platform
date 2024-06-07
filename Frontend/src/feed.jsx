import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Row, Col, Container} from "react-bootstrap"
import "./App.css"
function Feed(){
    const [messages, setMessages]=useState([])
 const navigate=useNavigate()
 const username=sessionStorage.getItem("username")
    useEffect(()=>{

       
        console.log(username)
        if(!username){
            navigate("/")
        }


    },[])
    useEffect(()=>{
        async function getmessages(){
            var result=await axios.post("http://localhost:3000/getmessages", {username:username})
            setMessages(result.data.messages)
            
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