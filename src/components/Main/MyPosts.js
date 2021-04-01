import { db } from '../../firebase';
import { useState, useEffect } from 'react';
import { useAuth } from "../../services/authService"
import { Jumbotron, Alert, Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyPosts = () => {
    const [scammers, setScammers] = useState([])
    const [visible, setVisible] = useState(6)
    const [didMount, setDidMount] = useState(false);
    const { currentUser } = useAuth();
    useEffect(() => {
        db.ref('scammers')
            .on("value", (snapshot) => {
                let arr = []
                snapshot.forEach(snap => {
                    let obj = snap.val();
                    if (obj.reporter === currentUser.email) {
                        obj.id = snap.key
                        arr.unshift(obj)
                    }
                });
                setScammers(arr)
                setDidMount(true)
            })
        return () => setDidMount(false);
    }, [currentUser.email]);

    const loadMore = () => {
        setVisible(prevVisible => prevVisible + 3)
    }

    const deletePost = (id) => {
        db.ref(`scammers/${id}`)
            .remove()
    }

    document.title = "Sram.bg - моите сигнали";
    if (!didMount) {
        return null;
    }
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h1>Моите сигнали</h1>
                    <p>
                        Тук можете да редактирате или триете подадените от вас сигнали.
                    </p>
                </Container>
            </Jumbotron>

            {(Array.from(scammers).length === 0) &&
                <Alert variant="danger" style={{ width: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                    Все още не сте добавили безсрамник...
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
                                <Button
                                    variant="outline-light"
                                    className="ml-3"
                                    style={{ float: 'right' }}
                                    onClick={() => { if (window.confirm('Сигурни ли сте, че искате да изтриете сигнала')) deletePost(scammer.id) }}
                                >
                                    Изтрий
                                    </Button>
                                <Link to={/edit-post/ + scammer.id}>
                                    <Button variant="outline-light" style={{ float: 'right' }}>
                                        Редактирай
                                </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    )
                })
            }
            {
                Array.from(scammers).length > 6 && <Button onClick={loadMore} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} variant="outline-dark" className="mt-3" type="submit">Покажи по-стари</Button>
            }
        </>
    )
}

export default MyPosts;