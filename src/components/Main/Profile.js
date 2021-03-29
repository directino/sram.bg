import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../services/authService"
import { Link, useHistory } from "react-router-dom"

export default function Profile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  document.title = "Sram.bg - Профил";
  return (
    <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "50vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Профил</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Имейл</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Парола</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Оставете празно, ако не желаете промяна"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Повтори парола</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Оставете празно, ако не желаете промяна"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Промяна
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Откажи</Link>
      </div>
      </div>
    </Container>
  )
}