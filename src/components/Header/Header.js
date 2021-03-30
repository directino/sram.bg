import { Navbar, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../services/authService';

const Header = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory()
    async function handleLogout(e) {
        e.preventDefault();
        try {
            history.push('/login')
            await logout()
        } catch {
            console.log('Неуспешен изход');
        }
    }
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/">Sram.bg - потребителят отвръща на удара</Navbar.Brand>
            <Form onSubmit={handleLogout} inline style={{position: 'absolute', right: 0}}>
            {currentUser && (<>
                <div style={{color: "white"}} className="mr-sm-2">Здравей, {currentUser.email}!</div>
                <Link to="/create">
                <Button className="mr-sm-2" variant="light" type="login">
                    Подай сигнал
                </Button>
                </Link>
                <Link to="/my-posts">
                <Button className="mr-sm-2" variant="outline-light" type="profile">
                    Моите сигнали
                </Button>
                </Link>
                <Link to="/profile">
                <Button className="mr-sm-2" variant="outline-light" type="profile">
                    Профил
                </Button>
                </Link>
                <Button className="mr-sm-2" variant="outline-light" type="create">
                    Изход
                </Button>
            </>
            )}
            {!currentUser && (<>
                <Link to="/login">
                <Button className="mr-sm-2" variant="outline-light" type="login">
                    Вход
                </Button>
                </Link>
                <Link to="/register">
                <Button className="mr-sm-2" variant="outline-light" type="register">
                    Регистрация
                </Button>
                </Link>
            </>
            )}
            </Form>
        </Navbar>
    );
}

export default Header;