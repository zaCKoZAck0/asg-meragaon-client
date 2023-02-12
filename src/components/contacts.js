import { ContactBody } from "./contactBody"

export const Contacts = ({contacts,loading}) => {

   
    return(<div style={{maxHeight:"90vh", overflowY:"scroll"}}>
        <h2 className="text-center">Contacts</h2>
        {
            contacts.map(contact => <ContactBody key={contact.id} contact={contact} />)
        }
    </div>)
}