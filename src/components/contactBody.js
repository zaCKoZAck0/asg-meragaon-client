import { Card } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {FiRefreshCcw} from 'react-icons/fi'
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";




export const ContactBody = ({contact}) =>{

    function getOTP(){
        return Math.floor(1000 + Math.random() * 9000)
    }


    const [show, setShow] = useState(false);
    const [OTP, setOTP] = useState(getOTP());
    const [showPop, setShowPop] = useState(false);


  const handleClose = () => {
    axios.post(`${BACKEND_URL}/otp`,{
        message: OTP,
        phone: contact.phone,
        contact: contact
    }).then(response=>{
        setShow(false);
        window.location.reload(false);
    }).catch(error=>{
        console.log(error);
        setShowPop(true)
    })
    };
  const handleShow = () => setShow(true);

    contact.picture = (contact.picture==='')?`https://source.boringavatars.com/beam/120/${contact.firstname}%20${contact.lastname}?square`:contact.picture;
    return(<>
    <Card onClick={handleShow} border="dark bg-light" style={{maxWidth: "400px",minWidth:"300px", margin:"5px", cursor:"pointer"}}>
        <Card.Body>
        <Card.Text style={{overflow:"hidden", whiteSpace:"nowrap"}} className="text-start fw-semibold fs-5"><img className="rounded-circle" style={{width: "60px", height:"60px", marginRight:"10px"}} alt="profile" src={contact.picture} />
         {contact.displayname}</Card.Text>
        </Card.Body>
        <Card.Footer>{contact.phone}</Card.Footer>
    </Card>

    <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message - {contact.displayname}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fw-semibold">
            <div style={{display:"flex",justifyContent:"space-around"}}>
            <img style={{width: "120px", height:"120px", margin:"10px"}} src={contact.picture} alt="Profile" className="rounded" />
            <div><p>First Name: {contact.firstname}</p>
            <p>Last Name: {contact.lastname}</p>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p></div></div>
        <InputGroup style={{display:"flex",justifyContent:"center"}}>
        <InputGroup.Text id="basic-addon3">
          Hi, Your OTP is:
        </InputGroup.Text>
        <Form.Control
        style={{maxWidth:"60px"}}
            disabled
          placeholder={OTP}
          aria-label="Recipient's username with two button addons"
        />
        <Button onClick={()=>setOTP(getOTP())} variant="outline-secondary"><FiRefreshCcw style={{marginBottom:2}} /></Button>
      </InputGroup>
      {(showPop)?(<p className="text-danger text-center">Error: Number Not Resistered With Twillio</p>):''}
            <div style={{display:"flex",justifyContent:"center"}} className="m-2">
                <Button onClick={handleClose} variant="primary" >
            Send OTP
          </Button></div>
            </Modal.Body>
      </Modal>
    </>)
}