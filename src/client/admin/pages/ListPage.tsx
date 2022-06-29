import { Button } from '@material-ui/core';
import withStyles, { StyledComponentProps } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICrudPageProps, IListPageState } from '../../../../@types/client/admin/pages';
import { trans } from '../../../shared/resources/lang/translate';
import ResultMessageBox from '../components/form/ResultMessageBox';
import ApiRequest from '../libraries/ApiRequest';
import DataTable from './../components/DataTable';
class ListPage extends React.Component<ICrudPageProps & StyledComponentProps & RouteComponentProps<{}>, IListPageState> {
  constructor(props: ICrudPageProps & StyledComponentProps & RouteComponentProps<{}>) {
    super(props);
    this.state = {
      actions: [],
      fields: [],
      disableAdd: true,
      filterItems: [],
      title: null,
      resource: null,
      fetching: true,
    };
  }
  componentDidMount() {
    this.getInitData();
  }
  getInitData() {
    const requester = new ApiRequest();
    requester.get(this.props.serverResource + '/list').then((res: any) => {
      const data = res.data.data;
      this.setState({ fetching: false, ...data });
    });
  }
  render() {
    const buttonContainerStyle: React.CSSProperties = {
      margin: '10px 0px',
      float: 'right',
    };
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
              <title>{this.state.title}</title>
            </Helmet>
            <ResultMessageBox />
            {!this.state.disableAdd && (
              <div className="button-container" style={buttonContainerStyle}>
                <Button component={Link} className={this.props.classes.addButton} to={'/' + this.state.resource + '/create'}>
                  {trans('resource.add', { item: '' })}
                </Button>
              </div>
            )}

            <DataTable
              filterFields={this.state.filterItems}
              resourceURL={this.state.resource}
              fields={this.state.fields}
              actions={this.state.actions}
            />
          </>
        )}
      </>
    );
  }
}

const styles = (theme) => ({
  addButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.third.contrastText,
  },
});

export default withStyles(styles)(ListPage);
