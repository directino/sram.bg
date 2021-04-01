import { db } from '../../firebase';
import { useState, useEffect, useRef } from 'react';
import { Jumbotron, Container, Card, Button, Form, FormControl, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const [scammers, setScammers] = useState([])
    const [visible, setVisible] = useState(6)
    const [input, setInput] = useState('')
    const [didMount, setDidMount] = useState('')
    const inputRef = useRef();
    useEffect(() => {
        db.ref('scammers')
            .on("value", (snapshot) => {
                let arr = []
                snapshot.forEach(snap => {
                    let obj = snap.val();
                    if (obj.city.toLowerCase().includes(input) ||
                        obj.firstName.toLowerCase().includes(input) ||
                        obj.secondName.toLowerCase().includes(input) ||
                        obj.phone.toLowerCase().includes(input) ||
                        obj.description.toLowerCase().includes(input)) {
                        obj.id = snap.key
                        arr.unshift(obj)
                    }
                });
                setScammers(arr)
                setDidMount(true)
            })
        return () => setDidMount(false);
    }, [input]);

    const loadMore = () => {
        setVisible(prevVisible => prevVisible + 3)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setInput(inputRef.current.value.toLowerCase());
    }

    document.title = "Sram.bg - потребителят отвръща на удара";
    if (!didMount) {
        return null;
    }
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
            <Form.Group style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
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
                            style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}
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
            <Button onClick={loadMore} style={{ marginLeft: '50%' }} variant="outline-dark" className="mb-4 mt-3" type="submit">Покажи по-стари</Button>
        </>
    )
}

export default Home;