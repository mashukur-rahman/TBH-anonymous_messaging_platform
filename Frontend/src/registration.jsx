import { Form, Row, Col, Button, Container, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
function Registration() {
  const navigate=useNavigate()
  const [show, setShow] = useState(false);
  const [warning,setWarning]=useState(false)
  var [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });
    useEffect(()=>{

        async function checker(){
            var result=await axios.post("http://localhost:3000/check", {username:formdata.username})
            if(result.data=="exists"){
                setWarning(true)
            }else{
                setWarning(false)
            }
        }
        checker()


    },[formdata.username])
  const handleClose = () => {
    setShow(false);
    setFormdata({ ...formdata, message: "" });
  };
  const handleShow = () => setShow(true);

 
  function handlechange(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    var result = await axios.post("http://localhost:3000/registeruser", formdata);
    if (result.data == "inserted") {
      handleShow();
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
                  { warning && <Form.Text className="text-muted">
          Username is already taken
        </Form.Text>}
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

                <Button type="submit" className="button d-flex ms-auto send">
                  Register
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header> */}
        <Modal.Body>User registered.</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
          <Button variant="primary" onClick={()=>navigate("/")} className="send">
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Registration;
