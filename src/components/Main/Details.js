import db from '../../firebase';
import { useEffect, useState } from 'react';
import { Jumbotron, Card, Button, Row, Col, Image, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Details = ({
    match,
    history
}) => {

    let [scammer, setScammer] = useState({});
    useEffect(() => {
        db.ref(`scammers/${match.params.id}`)
            .on("value", (snapshot) => {
                setScammer(snapshot.val());
            })

    }, []);

    const shamePics = [
        "https://cdn.psychologytoday.com/sites/default/files/field_blog_entry_images/ShameAdobeStock.jpeg",
        "https://cdn.vox-cdn.com/thumbor/96ngLnJDv5TLBIZ34tGqWxqw_NA=/0x0:6016x4000/1200x800/filters:focal(2527x1519:3489x2481)/cdn.vox-cdn.com/uploads/chorus_image/image/63613455/shutterstock_739399978.0.jpg",
        "https://images.theconversation.com/files/77416/original/image-20150409-18036-ym6cx8.jpg",
        "https://image.shutterstock.com/image-vector/sad-depressed-ashamed-man-surrounded-260nw-1377458948.jpg",
        "https://www.irishtimes.com/polopoly_fs/1.4002513.1567627113!/image/image.jpg_gen/derivatives/box_620_330/image.jpg",
        "https://markallenassets.blob.core.windows.net/communitycare/2019/01/Fotolia-stock-credit-Feodora-shame-600x375.jpg",
        "https://www.mindtools.com/blog/wp-content/uploads/2020/12/GI_931794052_SvetaZi.jpg",
        "https://www.verywellmind.com/thmb/f5guYBnvaFDcwyGv0cVuTt_DfQ4=/500x350/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-512596338-56e1cbb03df78c5ba056a56b.jpg",
        "https://welldoing.org/storage/app/uploads/public/5af/303/330/5af3033308acb233918344.jpg",
        "https://images.everydayhealth.com/images/stds/stds-the-emotional-side-722x406.jpg",
        "https://static7.depositphotos.com/1003625/753/i/950/depositphotos_7530039-stock-photo-shame.jpg",
        "https://st2.depositphotos.com/3343629/11163/i/950/depositphotos_111635170-stock-photo-a-man-experiencing-shame-and.jpg",
        "https://corkpsychotherapyandtraumacentre.ie/wp-content/uploads/2020/06/stigma.jpg",
        "https://www.sapiens.org/wp-content/uploads/2016/02/01_2655004551_75021161fe_o-1076x807-1076x588.jpg",
        "https://static.scientificamerican.com/sciam/cache/file/0BF00FA1-FA09-4066-B3F8407D7B7DCDF7_source.jpg",
        ]

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
            style={{ width: '1000px', marginLeft: 'auto', marginRight: 'auto' }}
            className="mb-5 mt-4"
        >
            <Card.Body>
                <Card.Header>
                <Row>
                    <Col style={{ paddingLeft: '30px'}} md={9}>
                    <Card.Title><br /> {scammer.firstName} {scammer.secondName}
                    <br /><br /> от {scammer.city}
                    <br /><br /> тел. {scammer.phone}</Card.Title>
                    </Col>
                    <Col xs={6} md={3}>
                        <Image style={{width: '220px', height: '200px'}} src={shamePics[Math.floor(Math.random() * 14)]} roundedCircle />
                    </Col>
                </Row>
                </Card.Header>

                <Card.Text style={{ padding: '20px', margin: '20px'}}>
                    Описание на измамата: <br /> <br /> {scammer.description}
                </Card.Text>
            </Card.Body>
        </Card>
        <Button onClick={() => history.goBack()} style={{ width: '180px', marginLeft: '47%' }} variant="outline-dark" className="mb-4" type="submit">Назад</Button>
        </>
    );
};

export default Details;