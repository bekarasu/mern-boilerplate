import { Button } from '@material-ui/core';
import withStyles, { StyledComponentProps } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICrudPageProps, IListPageState } from '../types/pages';
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

  componentDidMount = () => this.getInitData();

  getInitData = async () => {
    const requester = new ApiRequest();
    let data;
    try {
      const res = await requester.get(this.props.serverResource + '/grid');
      data = res.data.data;
    } catch (err) {
      this.setState({ fetching: false });
      return;
    }

    this.setState({ fetching: false, ...data });
  };

  render = () => {
    const buttonContainerStyle: React.CSSProperties = {
      margin: '10px 0px',
      float: 'right',
    };
    const { fetching, title, disableAdd, resource, filterItems, fields, actions } = this.state;

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
              <title>{title}</title>
            </Helmet>
            <ResultMessageBox />
            {!disableAdd && (
              <div className="button-container" style={buttonContainerStyle}>
                <Button component={Link} className={this.props.classes.addButton} to={`/${resource}/create`}>
                  {trans('resource.add', { item: '' })}
                </Button>
              </div>
            )}

            <DataTable filterFields={filterItems} resourceURL={resource} fields={fields} actions={actions} />
          </>
        )}
      </>
    );
  };
}

const styles = (theme) => ({
  addButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.third.contrastText,
  },
});

export default withStyles(styles)(ListPage);
