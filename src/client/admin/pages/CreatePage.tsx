import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { store } from '..';
import { ICreatePageState, ICrudPageProps } from '../types/pages';
import { trans } from '../../../shared/resources/lang/translate';
import { jsonToFormData } from '../../resources/helpers/form';
import CustomForm from '../components/form/CustomForm';
import ResultMessageBox from '../components/form/ResultMessageBox';
import ApiRequest from '../libraries/ApiRequest';
import { showServerResultMessage } from '../store/result/actions';

class CreateFormFooter extends React.Component {
  render = () => {
    const submitStyle: React.CSSProperties = {
      marginLeft: 'auto',
      marginTop: '10px',
    };

    return (
      <>
        {/** TODO add the functionality, it has no effect for now */}
        <FormControlLabel
          value="continue"
          control={<Checkbox color="primary" checked={false} />}
          label="Oluşturmaya Devam Et"
          labelPlacement="start"
        />
        <Button type="submit" style={submitStyle} variant="contained" color="primary">
          {trans('resource.add', { item: 'Ürün' }) /** TODO localization */}
        </Button>
      </>
    );
  };
}

const CreateForm = (props) => {
  const { handleSubmit, items, urlFromField } = props;
  return <CustomForm footerComponent={<CreateFormFooter />} handleSubmit={handleSubmit} items={items} urlFromField={urlFromField} />;
};

const CreateFormRedux: any = reduxForm({ form: 'createForm' })(CreateForm);

class CreatePage extends React.Component<ICrudPageProps, ICreatePageState> {
  constructor(props: ICrudPageProps) {
    super(props);
    this.state = {
      items: [],
      redirectURL: null, // TODO make this redirecting global using redux.
      fetching: true,
      urlFromField: undefined,
    };
  }

  componentDidMount = () => {
    this.getInitData();
  };

  getInitData = () => {
    const requester = new ApiRequest();
    requester.get(this.props.serverResource + '/create').then((res: any) => {
      const data = res.data.data;
      this.setState({ fetching: false, ...data });
    });
  };

  submit = (values: object) => {
    const requester = new ApiRequest();
    const fd = jsonToFormData(values);
    requester.post(this.state.resource, fd).then((res: any) => {
      if (res.status === 200) {
        store.dispatch(showServerResultMessage('success', res.data.message));
        this.setState({ redirectURL: '/' + this.state.resource + '/list' });
      } else if (res.status >= 400 && res.status <= 499) {
        store.dispatch(showServerResultMessage('warning', res.data.message));
      } else if (res.status >= 500) {
        store.dispatch(showServerResultMessage('error', res.data.message));
      }
    });
  };

  render = () => {
    return (
      <>
        {this.state.redirectURL ? (
          <Redirect to={this.state.redirectURL} />
        ) : (
          <>
            {this.state.fetching ? (
              <p>Sayfa Yükleniyor...</p> // TODO localization
            ) : (
              <>
                <Helmet>
                  <title>{this.state.title}</title>
                </Helmet>
                <ResultMessageBox />
                <CreateFormRedux onSubmit={this.submit} items={this.state.items} urlFromField={this.state.urlFromField} />
              </>
            )}
          </>
        )}
      </>
    );
  };
}

export default CreatePage;
