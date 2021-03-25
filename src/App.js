import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
