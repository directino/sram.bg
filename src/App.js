import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" exact component={Main} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
