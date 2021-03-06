import { db } from '../../firebase';
import { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../services/authService"

export default function Edit({
    match,
    history
}) {
    let [scammer, setScammer] = useState({});
    const phoneRef = useRef();
    const firstNameRef = useRef();
    const secondNameRef = useRef();
    const cityRef = useRef();
    const descriptionRef = useRef();
    const { currentUser } = useAuth();
    const [error, setError] = useState('')
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        db.ref(`scammers/${match.params.id}`)
            .on("value", (snapshot) => {
                setScammer(snapshot.val());
                setDidMount(true);
            })
        return () => setDidMount(false);
    }, [match.params.id]);

    function handleSubmit(e) {
        e.preventDefault()

        if (phoneRef.current.value.length < 8 ||
            phoneRef.current.value.length > 10 ||
            phoneRef.current.value[0] !== "0") {
            return setError("Въведете валиден телефонен номер във формат 088******* или 02******!")
        }

        if (currentUser.email !== scammer.reporter) {
            return setError("Не може да променяте чужди сигнали!")
        }

        setError("")
        db.ref(`scammers/${match.params.id}`)
            .update({
                phone: phoneRef.current.value,
                firstName: firstNameRef.current.value,
                secondName: secondNameRef.current.value,
                city: cityRef.current.value,
                description: descriptionRef.current.value,
            })
            .then(() => {
                history.push('/my-posts');
            })
            .catch(() => {
                setError("Неуспешна операция!")
            })
    }

    document.title = "Sram.bg - редакция сигнал";
    if (!didMount) {
        return null;
    }
    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "60vh" }}>
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Редакция на сигнала</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="phone">
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control type="number" ref={phoneRef} defaultValue={scammer.phone} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="firstName">
                                <Form.Label>Име</Form.Label>
                                <Form.Control type="text" ref={firstNameRef} defaultValue={scammer.firstName} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="secondName">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control type="text" ref={secondNameRef} defaultValue={scammer.secondName} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="city">
                                <Form.Label>Град/село</Form.Label>
                                <Form.Control type="text" ref={cityRef} defaultValue={scammer.city} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="description" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Опишете измамата</Form.Label>
                                <Form.Control as="textarea" rows={6} ref={descriptionRef} minLength={50} maxLength={1000} defaultValue={scammer.description} required></Form.Control>
                            </Form.Group>
                            {currentUser && <Button className="w-100" type="submit">Въведи</Button>}
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};