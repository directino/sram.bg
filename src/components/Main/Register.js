import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../services/authService"
import { useHistory, Link } from "react-router-dom"

export default function Register() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const repeatPasswordRef = useRef()
  const { register } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
        return setError("Паролите трябва да са еднакви!")
      }
  
      if (passwordRef.current.value.length < 8) {
          return setError("Паролата трябва да минимум 8 символа!")
      }

    setError("")
    register(emailRef.current.value, passwordRef.current.value)
    .then(() => {
        setLoading(true)
        history.push("/")
    })
    .catch(() => {
        setError("Неуспешна регистрация!")
    })

    setLoading(false)
}

  document.title = "Sram.bg - Регистрация";
    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "50vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Регистрация</h2>
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
                            <Form.Group id="repeatPassword">
                                <Form.Label>Повторете паролата</Form.Label>
                                <Form.Control type="password" ref={repeatPasswordRef} required></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">Регистрация</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Вече сте регистриран? Моля използвайте <Link to="/login">Вход</Link>!
                </div>
            </div>
        </Container>
    );
}