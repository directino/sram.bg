import db from '../../firebase';
import { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../services/authService"
import { useHistory } from "react-router-dom"

export default function Create() {
    const phoneRef = useRef();
    const firstNameRef = useRef();
    const secondNameRef = useRef();
    const cityRef = useRef();
    const descriptionRef = useRef();
    const { currentUser } = useAuth();
    let reporter = '';
    if (currentUser) {
        reporter = currentUser.email;
    }
    const [error, setError] = useState('')
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if (phoneRef.current.value.length < 8 ||
            phoneRef.current.value.length > 10 ||
            phoneRef.current.value[0] !== "0") {
            return setError("Въведете валиден телефонен номер във формат 088******* или 02******!")
        }

        setError("")
        return db.ref("scammers")
            .push({
                phone: phoneRef.current.value,
                firstName: firstNameRef.current.value,
                secondName: secondNameRef.current.value,
                city: cityRef.current.value,
                description: descriptionRef.current.value,
                reporter,
            })
            .then(() => {
                history.push('/');
            })
            .catch(setError("Неуспешна операция!"))
    }

    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "60vh" }}>
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Информация за безсрамника</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="phone">
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control type="number" ref={phoneRef} placeholder="088*******" required></Form.Control>
                            </Form.Group>
                            <Form.Group id="firstName">
                                <Form.Label>Име</Form.Label>
                                <Form.Control type="text" ref={firstNameRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="secondName">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control type="text" ref={secondNameRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="city">
                                <Form.Label>Град/село</Form.Label>
                                <Form.Control type="text" ref={cityRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="description" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Опишете измамата</Form.Label>
                                <Form.Control as="textarea" rows={6} ref={descriptionRef} minLength={50} maxLength={1000} required></Form.Control>
                            </Form.Group>
                            <Button className="w-100" type="submit">Въведи</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

//     return (
//         <Container className="d-flex align-items-center justify-content-center"
//             style={{ minHeight: "50vh" }}>
//             <div className="w-100" style={{ maxWidth: "400px" }}>
//                 <Card>
//                     <Card.Body>
//                         <h2 className="text-center mb-4">Регистрация</h2>
//                         {error && <Alert variant="danger">{error}</Alert>}
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group id="email">
//                                 <Form.Label>Имейл</Form.Label>
//                                 <Form.Control type="email" ref={emailRef} required></Form.Control>
//                             </Form.Group>
//                             <Form.Group id="password">
//                                 <Form.Label>Парола</Form.Label>
//                                 <Form.Control type="password" ref={passwordRef} required></Form.Control>
//                             </Form.Group>
//                             <Form.Group id="repeatPassword">
//                                 <Form.Label>Повторете паролата</Form.Label>
//                                 <Form.Control type="password" ref={repeatPasswordRef} required></Form.Control>
//                             </Form.Group>
//                             <Button disabled={loading} className="w-100" type="submit">Регистрация</Button>
//                         </Form>
//                     </Card.Body>
//                 </Card>
//                 <div className="w-100 text-center mt-2">
//                     Вече сте регистриран? Моля използвайте <Link to="/login">Вход</Link>!
//                 </div>
//             </div>
//         </Container>
//     );
// }