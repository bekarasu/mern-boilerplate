import * as React from 'react';
import Routes from '../../shared/resources/routes';
import Footer from './layouts/Footer';
import { renderRoutes } from 'react-router-config';
import Navbar from './layouts/Navbar';
import { Container } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Container className="min-vh-100">
          <div>{renderRoutes(Routes)}</div>
        </Container>
        <Footer />
      </>
    );
  }
}

export default App;
