import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { Jumbotron, Card, Button, Row, Col, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import shamePics from '../../../src/shamePics';

const Details = ({
    match,
    history
}) => {
    const [picture, setPicture] = useState({});
    let [scammer, setScammer] = useState({});
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
        setPicture(shamePics([Math.floor(Math.random() * 14)]));
        db.ref(`scammers/${match.params.id}`)
            .on("value", (snapshot) => {
                setScammer(snapshot.val());
                setDidMount(true)
            })
        return () => setDidMount(false);
    }, [match.params.id]);

    if (!didMount) {
        return null;
    }
    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h1>Описание на измамата</h1>
                    <p>
                        Преди да бъдат публикувани сигналите се проверяват от модератор. Одобряват се само сигнали с приложени убедителни доказателства (документи, скрийншоти, записи, др.). Всеки, който се чувства несправедливо обвинен, може да поиска изтриване на сигнала от формата <Link to="/contact">"Връзка с нас"</Link>, като приложи съответните доказателства.
                    </p>
                </Container>
            </Jumbotron>
            <Card
                bg="primary"
                text="white"
                key={scammer.id}
                style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}
                className="mb-5 mt-4"
            >
                <Card.Body>
                    <Card.Header>
                        <Row>
                            <Col style={{ paddingLeft: '30px' }} >
                                <Card.Title><br /> {scammer.firstName} {scammer.secondName}
                                    <br /><br /> от {scammer.city}
                                    <br /><br /> тел. {scammer.phone}</Card.Title>
                            </Col>
                            <Col >
                                <Image style={{ width: '220px', height: '200px', float: "right" }} src={picture} roundedCircle />
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Text style={{ padding: '20px', margin: '20px' }}>
                        Описание на измамата: <br /> <br /> {scammer.description}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Button onClick={() => history.goBack()} style={{ marginLeft: '50%' }} variant="outline-dark" className="mb-4" type="submit">Назад</Button>
        </>
    );
};

export default Details;