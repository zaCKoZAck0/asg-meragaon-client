import Card from 'react-bootstrap/Card';

export const MessageBody = ({message}) => {
    const date = new Date(message.date)
    return (<>
    <Card className='text-center' border={'dark'} bg={'light'} style={{width:'300px', margin:'5px'}}>
        <Card.Body>
            <Card.Title className='fs-1'>{message.message}</Card.Title>
            <Card.Subtitle className="text-muted">{message.displayname}</Card.Subtitle>
            <Card.Text>
                <p className='mb-0 text-muted fs-4 fw-light'>{message.phone}</p>
                <p className="text-muted fw-semibold mb-0 mt-2">{date.toLocaleString()}</p>
                </Card.Text>
        </Card.Body>
    </Card>
    </>)
}