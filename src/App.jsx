import './Assets/Styles/app.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Layouts/Header/Header';
import Main from './Layouts/Main/Main';
import Footer from './Layouts/Footer/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Main />
      <Footer />
    </Router>
  )
}

export default App;
