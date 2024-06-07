import "./App.css";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Button, Container, Modal} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
function Messagebox() {
    const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormdata({...formdata, message:""})
};
  const handleShow = () => setShow(true);
  const user = useParams();
  console.log(user);
  var [formdata, setFormdata] = useState({
    message: "",
    receiver: user.username,
  });
  function handlechange(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    var result = await axios.post("http://localhost:3000/send", formdata);
    if(result.data=="successful"){
        handleShow()
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
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>
                    Send anonymous message to{" "}
                    <span className="username">{user.username}</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formdata.message}
                    onChange={handlechange}
                  />
                </Form.Group>
                <Button type="submit" className="button d-flex ms-auto send">
                  Send
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
        <Modal.Body>Anonymous message sent!</Modal.Body>
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

export default Messagebox;
