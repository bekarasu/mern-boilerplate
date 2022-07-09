import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { IReduxUserProps } from '../types/pages';
import ResourceRoute from '../components/ResourceRoute';
import Dashboard from '../pages/Dashboard';

class Content extends React.Component<IReduxUserProps> {
  render = () => {
    const styles: CSSProperties = {
      padding: '0px 15px',
      minHeight: '90vh',
    };
    return (
      <>
        <Row style={styles}>
          <ResourceRoute link="playground" />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Row>
      </>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Content);
