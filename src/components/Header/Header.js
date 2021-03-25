import { Navbar, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/">Sram.bg - потребителят отвръща на удара</Navbar.Brand>
            {/* <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav> */}
            <Form inline style={{position: 'absolute', right: 0}}>
                <Form.Control className="mr-sm-2" type="email" placeholder="Въведи имейл" />

                <Form.Control className="mr-sm-2" type="password" placeholder="Парола" />

                <Button className="mr-sm-2" variant="outline-light" type="submit">
                    Вход
                </Button>
                <Button className="mr-sm-2" variant="outline-light" type="register">
                    Регистрация
                </Button>
            </Form>
        </Navbar>
    );
}

export default Header;