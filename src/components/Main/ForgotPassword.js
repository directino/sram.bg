import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../services/authService"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Проверете своята поща за следващи инструкции")
        } catch {
            setError("Не успяхме да ресетнем паролата")
        }

        setLoading(false)
    }

    document.title = "Sram.bg - забравена парола";
    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "50vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Ресет на парола</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Имейл</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">
                                Ресет
            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/login">Вход</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Не сте регистриран? <Link to="/register">Регистрация</Link>
                </div>
            </div>
        </Container>
    )
}