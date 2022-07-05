import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

class HomePage extends React.Component {
  render = () => (
    <>
      <Helmet>
        <title>Homepage</title>
        <meta property="og:title" content="Anasayfa" />
      </Helmet>
      <Row>
        <Col>Welcome Homepage</Col>
      </Row>
    </>
  );
}

export default HomePage;
