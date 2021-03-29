import db from '../../firebase';
import { useState, useEffect } from 'react';
import { Jumbotron, Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import ScammerCard from './ScammerCard';

const Home = () => {
    const [scammers, setScammers] = useState([])
    const [visible, setVisible] = useState(6)
    useEffect (() => {
        db.ref('scammers')
          .on("value", (snapshot) => {
            let arr = []
            snapshot.forEach(snap => {
                let obj = snap.val();
                obj.id = snap.key
                arr.unshift(obj)
            });
             setScammers(arr)
        })
    }, []);

    const loadMore = () => {
        setVisible(prevVisible => prevVisible + 3)
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