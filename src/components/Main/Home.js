import db from '../../firebase';
import { useState, useEffect } from 'react';
import { Jumbotron, Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import ScammerCard from './ScammerCard';

const Home = () => {
    const [scammers, setScammers] = useState([])
    useEffect (() => {
        db.ref('scammers')
          .on("value", (snapshot) => {
            let arr = []
            snapshot.forEach(snap => {
                let obj = snap.val();
                obj.id = snap.key
                arr.push(obj)
            });
             setScammers(arr)
        })
    }, []);

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
                Array.from(scammers).map(scammer => {
                    return (
                        <Card
                            bg="primary"
                            text="white"
                            key={scammer.id}
                            style={{ width: '1000px', marginLeft: 'auto', marginRight: 'auto' }}
                            className="mb-2"
                        >
                            <Card.Body >
                                <Card.Text style={{ display: 'inline' }}>
                                    Име: {scammer.firstName} {scammer.secondName}, Град/село: София, Тел. {scammer.phone}
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
        </>
    )
}

export default Home;