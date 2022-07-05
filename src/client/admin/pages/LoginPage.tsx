import { Button, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { store } from '..';
import { ILoginPageState } from '../types/pages';
import { trans } from '../../../shared/resources/lang/translate';
import { adminApiURL } from '../../resources/strings/apiURL';
import { login } from '../store/authenticate/actions';

class LoginPage extends React.Component<{}, ILoginPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  setUsername = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => this.setState({ username: e.currentTarget.value });
  setPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => this.setState({ password: e.currentTarget.value });

  handleLogin = async () => {
    const formData: object = {
      username: this.state.username,
      password: this.state.password,
    };
    await axios.post(adminApiURL + 'login', formData).then(async (res) => {
      if (res.status === 200) {
        localStorage.setItem('admin:accessToken', res.data.data.access_token);
        store.dispatch(login(res.data.data.user));
      }
    });
  };

  render = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <TextField name="username" label={trans('forms.username')} value={this.state.username} onChange={this.setUsername} />
        <TextField name="password" label={trans('forms.password')} value={this.state.password} onChange={this.setPassword} type="password" />
        <StyledButton onClick={this.handleLogin.bind(this)}>{trans('forms.login')}</StyledButton>
      </Grid>
    );
  };
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
});

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #005086 20%, #318fb5 80%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    padding: '5px 15px',
    margin: '10px 0 0 0',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default connect(mapStateToProps)(LoginPage);
