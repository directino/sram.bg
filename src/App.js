import './App.css';

import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Main/Home';
import Details from './components/Main/Details';
import Contact from './components/Main/Contact';
import PageNotFound from './components/Main/PageNotFound';
import Register from './components/Main/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <br/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/details" exact component={Details} />
        <Route path="/register" exact component={Register} />
        <Route component={PageNotFound} />
      </Switch>
      <br/>
      <Footer />
    </div>
  );
}

export default App;
