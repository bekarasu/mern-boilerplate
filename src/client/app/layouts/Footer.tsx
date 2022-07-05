import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default class Footer extends React.Component {
  render = () => (
    <footer className="z-999">
      <Container>
        <Row>
          <p>Copyright 2022 © bekarasu.com All rights reserved</p>
        </Row>
      </Container>
    </footer>
  );
}
