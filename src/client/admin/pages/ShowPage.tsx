import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { IUpdatePageProps, IUpdatePageState } from '../types/pages';
import { trans } from '../../../shared/resources/lang/translate';
import ApiRequest from '../libraries/ApiRequest';
import { FieldItem } from '../types/form';
const requester = new ApiRequest();

class ShowPage extends React.Component<IUpdatePageProps & RouteComponentProps<RouteParams>, IUpdatePageState> {
  constructor(props: IUpdatePageProps & RouteComponentProps<RouteParams>) {
    super(props);
    this.state = {
      fetching: true,
      items: this.props.items,
    };
  }

  componentDidMount = async () => {
    let res;
    try {
      res = await requester.get(this.props.serverResource + '/' + this.props.match.params.id);
    } catch (err) {
      return this.setState({ fetching: false });
    }

    const data = res.data.data;
    this.setState({ fetching: false, ...data });
  };

  render = () => {
    const { fetching, items, title } = this.state;
    return (
      <>
        {fetching ? (
          <>
            <Helmet>
              <title>{'Sayfa Yükleniyor...'}</title> {/** TODO localization */}
            </Helmet>
            <p>Sayfa Yükleniyor...</p> {/** TODO localization */}
          </>
        ) : (
          <>
            <Helmet>
              <title>{trans('resource.show', { item: title })}</title>
            </Helmet>
            <Grid container direction="column">
              {items.map((item: FieldItem, index: number) => {
                return (
                  <TextField
                    style={{ margin: '20px 0' }}
                    key={index}
                    label={trans('db.' + item.name)}
                    defaultValue={item.initialValue}
                    InputProps={{ readOnly: true }}
                  />
                );
              })}
            </Grid>
          </>
        )}
      </>
    );
  };
}

interface RouteParams {
  id: string;
}

export default ShowPage;
