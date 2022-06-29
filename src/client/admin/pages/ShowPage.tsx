import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { IUpdatePageProps, IUpdatePageState } from '../../../../@types/client/admin/pages';
import { trans } from '../../../shared/resources/lang/translate';
import ApiRequest from '../libraries/ApiRequest';
import { FieldItem } from './../../../../@types/client/admin/form.d';

class ShowPage extends React.Component<IUpdatePageProps & RouteComponentProps<RouteParams>, IUpdatePageState> {
  constructor(props: IUpdatePageProps & RouteComponentProps<RouteParams>) {
    super(props);
    this.state = {
      fetching: true,
      items: this.props.items,
    };
  }
  componentDidMount() {
    const requester = new ApiRequest();
    requester.get(this.props.serverResource + '/' + this.props.match.params.id).then((res: any) => {
      const data = res.data.data;
      this.setState({ fetching: false, ...data });
    });
  }
  render() {
    return (
      <>
        {this.state.fetching ? (
          <>
            <Helmet>
              <title>{'Sayfa Yükleniyor...'}</title> {/** TODO localization */}
            </Helmet>
            <p>Sayfa Yükleniyor...</p> {/** TODO localization */}
          </>
        ) : (
          <>
            <Helmet>
              <title>{trans('resource.show', { item: this.state.title })}</title>
            </Helmet>
            <Grid container direction="column">
              {this.state.items.map((item: FieldItem, index: number) => {
                return (
                  <TextField
                    style={{ margin: '20px 0' }}
                    key={index}
                    label={trans('db.' + item.name)}
                    defaultValue={item.initialValue}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              })}
            </Grid>
          </>
        )}
      </>
    );
  }
}

interface RouteParams {
  id: string;
}

export default ShowPage;
