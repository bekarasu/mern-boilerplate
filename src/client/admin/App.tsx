import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { store } from '.';
import { IPanelUser } from './../../../@types/client/admin/user.d';
import ApiRequest from './libraries/ApiRequest';
import Authenticated from './pages/Authenticated';
import LoginPage from './pages/LoginPage';
import { login } from './store/authenticate/actions';

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      authorizing: true,
    };
  }
  componentDidMount() {
    const apiRequest = new ApiRequest();
    apiRequest
      .get('auth-token')
      .then((res) => {
        if (res.status === 200) {
          store.dispatch(login(res.data.data.user));
        }
      })
      .then(() => this.setState({ authorizing: false }))
      .catch(() => this.setState({ authorizing: false }));
  }

  render() {
    const { user } = this.props;
    return (
      <>
        {this.state.authorizing ? null : (
          <div className="min-vh-100 d-flex">
            {user == null ? <Redirect to="/" /> : null}
            <Switch>{user == null ? <Route exact path="/" component={LoginPage} /> : <Route exact path="/*" component={Authenticated} />}</Switch>
          </div>
        )}
      </>
    );
  }
}

export interface IAppProps {
  user?: IPanelUser;
}

export interface IAppState {
  authorizing: boolean;
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(App);
