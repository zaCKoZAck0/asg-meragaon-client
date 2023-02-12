import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import {FiUpload} from 'react-icons/fi'
import { contacts } from '../test';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constants';
import { useState } from 'react';



export const ContactsInput =({style, setShowInput})=>{

    const [contactsString, setContactsString] = useState("")
    const [error, setError] = useState("")

    function onChange(e){
        setContactsString(e.target.value)
        setError('')
    }

    function handleClick(e){
      if(contactsString ==='') return setError("Input can't be empty")
    try{
        JSON.parse(contactsString)
    }catch(e){
        return setError("Invalid JSON")
    }
    axios.post(`${BACKEND_URL}/contacts`,{
        contacts: contactsString
    }).then(response=>{
        if(response.status !== 200){
            return setError(response.message);
        }
        setShowInput(false)
        window.location.reload(false);
    })
}
    return(<div style={style} className='m-2 row'>
        <Alert className='col-lg-6 my-2' style={{display:`${error!==''?"none":"block"}`}} variant="success">
      <Alert.Heading>Hey, before you continue</Alert.Heading>
      Your JSON can have these <em>optional</em> fields.
      <p>firstname, lastname, email , picture.</p>
      but must have these <em>mandatory</em> fields.
      <p>phone.</p>
      You can use below example as a reference or for testing.
      <hr />
      <p className="mb-0 fw-semibold">
        {JSON.stringify(contacts, null, 2)}
      </p>
    </Alert>
    <Alert className='col-lg-6 my-2' style={{display:`${error===''?"none":"block"}`}} variant='danger'>
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <hr />
        <p className="mb-0 fw-semibold">
        {contactsString}
      </p>
    </Alert>
      <FloatingLabel className='col-lg-6 p-2' controlId="floatingTextarea2" label="Contacts JSON">
        <Form.Control
          as="textarea"
          onChange={onChange}
          placeholder="Enter Contacts"
          style={{ height: '400px' }}
        />
      </FloatingLabel>
      <div style={{display:"flex", justifyContent:"center"}}>
      <Button onClick={handleClick} className='my-2'><FiUpload style={{verticalAlign: "center", marginBottom:5}} size={20} /> Upload</Button>
      </div>
      <hr />
    </div>)
}