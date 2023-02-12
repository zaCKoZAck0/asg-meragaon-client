import { MessageBody } from "./messageBody"

export const Messages = ({messages}) => {
    messages = messages.sort((date1, date2) => new Date(date1.date) - new Date(date2.date)).reverse()
    return(<div className="container">
        <h2 className="text-center">Messages</h2>
        <div className="row row-lg-cols-2" style={{maxHeight:"90vh", overflowY:"scroll", display:"flex",justifyContent:"center"}}>
        {
        messages.map((message) => <MessageBody className="col" key={message.id} message={message} />)
        }
        </div>

    </div>)
}