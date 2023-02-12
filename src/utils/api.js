import { BACKEND_URL } from "../utils/constants"
import axios from "axios"

export async function getContacts(){
    let myContacts = await axios.get(`${BACKEND_URL}/contacts`)
        return myContacts;
    }