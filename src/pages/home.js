import axios from "axios"
import { useState, useEffect } from "react"
import {AiOutlineUserAdd} from "react-icons/ai"

import { Contacts } from "../components/contacts"
import { ContactsInput } from "../components/contactsInput"
import { BACKEND_URL } from "../utils/constants"
import Button from 'react-bootstrap/Button';
import { Messages } from "../components/messages"


export const Home = () =>{

    const [contacts, setContacts] = useState({contacts: []});
    const [messages, setMessages] = useState({messages: []});

    const [width, setWidth] = useState(window.innerWidth);

    const [showInput, setShowInput] = useState(false);
    function handleWindowSizeChange(){
      setWidth(window.innerWidth);
    }


    useEffect(
      () => {
        window.addEventListener('resize', handleWindowSizeChange);
        axios.get(`${BACKEND_URL}/contacts`)
        .then(response => {
            setContacts(response.data)})
        axios.get(`${BACKEND_URL}/messages`)
        .then(response => {
            setMessages(response.data)})
        return ()=> {
        window.removeEventListener('resize', handleWindowSizeChange);
        }
      },
      [],
    )
    
    const isMobile = width <= 768;

    return(<>
      
      <ContactsInput style={{display:`${showInput?"":"none"}`}} setShowInput={setShowInput}  />
        <div style={{display:"flex",justifyContent:"center"}}><Button onClick={()=>setShowInput(!showInput)} className="btn btn-lg my-2">Add Contacts <AiOutlineUserAdd size={25} style={{marginBottom:"2"}} /></Button></div>
      <div className="row m-0" style={{display:"flex",justifyContent:"center"}}>
        <div className="col-lg-4" style={{display:"flex",justifyContent:"center"}}><Contacts contacts={contacts.contacts} /></div>  
        <hr className="m-5"  style={{display:`${isMobile?"block":"none"}`}}/>
        <div className="col-lg-7" style={{display:"flex",justifyContent:"center"}}><Messages messages={messages.messages} /></div>  
        </div>
    </>)
}