import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../services/authService"
import { useHistory, Link } from "react-router-dom"

export default function Login() {
        const emailRef = useRef()
        const passwordRef = useRef()
        const { login } = useAuth()
        const [error, setError] = useState("")
        const [loading, setLoading] = useState(false)
        const history = useHistory()

        function handleSubmit(e) {
            e.preventDefault()
            setError("")
            setLoading(true)
            login(emailRef.current.value, passwordRef.current.value)
                .then(() => {
                    history.push('/');
                })
                .catch(setError("Неуспешен вход!"))

        return setLoading(false)
}

return (
    <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "50vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Вход</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Имейл</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Парола</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Вход</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Не сте регистриран? Моля използвайте <Link to="/register">Регистрация</Link>!
                </div>
        </div>
    </Container>
);
}