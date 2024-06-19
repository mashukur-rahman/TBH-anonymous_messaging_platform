import { Form, Row, Col, Button, Container, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "./Authcontext";
import { useContext } from "react";
function Login() {
  const myContext=useContext(AuthContext)
  
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
   
};
  const navigate=useNavigate()
 
  var [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });



 
  function handlechange(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    var result = await axios.post("http://localhost:3000/login", formdata);
 
    if(result.data.token){
      myContext.login(result.data.token)
      navigate("/feed")
    }else{
      setShow(true)
    }
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <p className="title">TBH</p>
          </Col>
        </Row>
        <Row className="justify-content-center mssg-row">
          <Col md={12} lg={6} className="d-flex justify-content-center">
            <div className="outerdiv">
              <Form onSubmit={handlesubmit} className="form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                 
                    name="username"
                    value={formdata.username}
                    onChange={handlechange}
                  />
               
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                  
                    name="password"
                    value={formdata.password}
                    onChange={handlechange}
                  />
                </Form.Group>
                <Row>
                  <Col>
                  <Button onClick={()=>navigate("/register")} className=" primary-btn button d-flex me-auto send">
                  Register
                </Button>
                  </Col>
                <Col>
                <Button type="submit" className=" primary-btn button d-flex ms-auto send">
                  Login
                </Button>
                </Col>
                
                </Row>
                

              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>User not found. Please try again.</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose} className="send">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default Login;
