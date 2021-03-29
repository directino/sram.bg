import db from '../../firebase';
import { useState, useEffect, useRef } from 'react';
import { Jumbotron, Container, Card, Button, Form, FormControl, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import ScammerCard from './ScammerCard';

const Home = () => {
    const [scammers, setScammers] = useState([])
    const [visible, setVisible] = useState(6)
    const inputRef = useRef();
    const [input, setInput] = useState('')
    useEffect (() => {
        db.ref('scammers')
          .on("value", (snapshot) => {
            let arr = []
            snapshot.forEach(snap => {
                let obj = snap.val();
                if (obj.city.includes(input) ||
                obj.firstName.includes(input) ||
                obj.secondName.includes(input) ||
                obj.phone.includes(input) ||
                obj.description.includes(input)) {
                    obj.id = snap.key
                    arr.unshift(obj)
                }
            });
            setScammers(arr)
        })
    }, [input]);

    const loadMore = () => {
        setVisible(prevVisible => prevVisible + 3)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setInput(inputRef.current.value);
    }

    document.title = "Sram.bg - потребителят отвръща на удара";
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h1>Стена на срама</h1>
                    <p>
                        Искате да купите нещо от olx.bg или bazar.bg, но ви е страх от некоректни продавачи. Потърсете ги на нашата стена на срама!
                        Вече сте сте били измамен? Предупредете за безсрамника тук и помогнете на бъдещите жертви.
                </p>
                </Container>
            </Jumbotron>
            <Form.Group style={{ width: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                <FormControl onChange={handleChange} ref={inputRef} type="text" placeholder="Търси по име, град, телефонен или описание..." />
            </Form.Group>
    
            {(Array.from(scammers).length === 0 && input !== '') &&
                    <Alert variant="danger" style={{ width: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Нямаме безсрамник, който да отговаря на вашето търсене...
                    </Alert>
            }
            
            {
                Array.from(scammers).slice(0, visible).map(scammer => {
                    return (
                        <Card
                            bg="primary"
                            text="white"
                            key={scammer.id}
                            style={{ width: '1000px', marginLeft: 'auto', marginRight: 'auto' }}
                            className="mb-2"
                        >
                            <Card.Body>
                                <Card.Text style={{ display: 'inline' }}>
                                    Име: {scammer.firstName} {scammer.secondName}, Град/село: {scammer.city}, Тел. {scammer.phone}
                                </Card.Text>
                                <Link to={/scammers/ + scammer.id}>
                                    <Button variant="outline-light" style={{ float: 'right' }}>
                                        Описание
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    )
                })
            }
            <Button onClick={loadMore} style={{ width: '180px', marginLeft: '47%' }} variant="outline-dark" className="mb-4 mt-3" type="submit">Покажи по-стари</Button>
        </>
    )
}

export default Home;