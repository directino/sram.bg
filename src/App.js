import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Main/Home';
import Details from './components/Main/Details';
import Contact from './components/Main/Contact';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Register from './components/Main/Register';
import Login from './components/Main/Login';
import Create from './components/Main/Create';
import Profile from './components/Main/Profile';
import ForgotPassword from './components/Main/ForgotPassword';
import MyPosts from './components/Main/MyPosts';
import Edit from './components/Main/Edit';

function App() {
  return (
    <div className="App">
      <Header />
      <br/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/scammers/:id" exact component={Details} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/my-posts" exact component={MyPosts} />
        <Route path="/edit-post/:id" exact component={Edit} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/create" exact component={Create} />
        <Route component={PageNotFound} />

      </Switch>
      <br/>
      <Footer />
    </div>
  );
}

export default App;
