import * as React from 'react';
import { Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
class AboutUsPage extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Hakkımızda</title>
          <meta property="og:title" content="Hakkımızda" />
        </Helmet>
        <Row>
          <strong>İçerik Tabanlı MERN + Typescript Başlangıç Kiti</strong>
        </Row>
        <Row>
          <a href="https://github.com/bkarasu95" target="_blank">
            Github Repo
          </a>
        </Row>
      </>
    );
  }
}

export default AboutUsPage;
