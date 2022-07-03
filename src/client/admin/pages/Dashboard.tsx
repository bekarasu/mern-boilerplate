import * as React from 'react';
import { Helmet } from 'react-helmet';

class Dashboard extends React.Component {
  render = () => (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <strong>Dashboard</strong>
    </>
  );
}

export default Dashboard;
