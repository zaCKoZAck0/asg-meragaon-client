import { Button } from "react-bootstrap"
import { ContactBody } from "./contactBody"

export const Contacts = (contacts,refresh,setRefresh) => {
    return(<div style={{maxHeight:"90vh", overflowY:"scroll"}}>
        <h2 className="text-center">Contacts</h2>

        {
            contacts.contacts.map(contact => <ContactBody key={contact.id} contact={contact} />)
        }
    </div>)
}