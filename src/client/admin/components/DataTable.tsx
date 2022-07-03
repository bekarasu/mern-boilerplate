import { Paper, Snackbar, Table, TableContainer } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { IDataTableProps, IDataTableState } from '../../../../@types/client/admin/components';
import { IFilter } from '../../../../@types/client/admin/form';
import ApiRequest from '../libraries/ApiRequest';
import DataTableBody from './DataTable/DataTableBody';
import DataTableFooter from './DataTable/DataTableFooter';
import DataTableHead from './DataTable/DataTableHead';
import Filter from './Filter';
const requester = new ApiRequest();
class DataTable extends React.Component<IDataTableProps, IDataTableState> {
  constructor(props: IDataTableProps) {
    super(props);
    this.state = {
      items: [],
      fetching: true,
      requestParams: {
        limit: 30,
        start: 0,
        orderBy: null,
      },
      dataCount: 0,
      deleteResult: null,
      currentPage: 1,
    };
  }

  actionResult = (result: boolean): void => {
    this.getData();
    this.setState({ deleteResult: result ? 'success' : 'error' });
  };

  componentDidMount = () => this.getData();

  handlePageChange = (page: number) => {
    const { requestParams } = this.state;
    requestParams.start = (page - 1) * requestParams.limit;
    this.setState({ requestParams, currentPage: page });
    this.getData();
  };

  handleDataLengthChange = (length: number) => {
    const { requestParams } = this.state;
    requestParams.limit = length;
    this.setState({ requestParams });
    this.getData();
  };

  componentDidUpdate = (prevProps: IDataTableProps) => {
    if (prevProps.resourceURL !== this.props.resourceURL || prevProps.filters.fields !== this.props.filters.fields) {
      // check these for preventing unnecessary data getting
      if (this.props.filters.fields !== null) {
        const newParams = this.state.requestParams;
        newParams.start = 0; // if the filter is set, reset the page state
        this.setState({ requestParams: newParams, currentPage: 1 });
        let search = ''; // request search param
        this.props.filters.fields.map((filter: IFilter, index: number) => {
          // convert the server compatible query
          search += filter.name + '=' + filter.value;
          if (this.props.filters.fields.length !== 1 && index < this.props.filters.fields.length - 1) {
            search += ','; // seperate the fields
          }
        });
        const requestParams = this.state.requestParams;
        requestParams.search = search;
        this.setState({ requestParams, items: [] });
      }
      this.getData();
    }
  };

  getData = async () => {
    const { resourceURL } = this.props;
    if (!resourceURL) {
      return this.setState({ fetching: false });
    }

    const { requestParams } = this.state;

    this.setState({ fetching: true });
    window.scrollTo(0, 0);

    let res;
    try {
      res = await requester.get(resourceURL, requestParams);
    } catch (err) {
      return this.setState({ fetching: false });
    }

    const { items, total: dataCount } = res.data.data;
    this.setState({ items, dataCount, fetching: false });
  };

  render = () => {
    const { currentPage, fetching, dataCount, items, requestParams, deleteResult } = this.state;

    console.log(items, fetching, dataCount);

    return (
      <>
        {this.props.filterFields && this.props.filterFields.length !== 0 && <Filter items={this.props.filterFields} />}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <DataTableHead fetching={fetching} {...this.props} items={items} />
            <DataTableBody fetching={fetching} items={items} {...this.props} actionResult={this.actionResult.bind(this)} />
            <DataTableFooter
              currentPage={currentPage}
              dataLengthChange={this.handleDataLengthChange}
              pageChange={this.handlePageChange}
              fetching={fetching}
              dataCount={dataCount}
              {...this.props}
              limit={requestParams.limit}
            />
          </Table>
        </TableContainer>
        {/** TODO make it app-wide snackbar */}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={deleteResult != null}
          autoHideDuration={5000}
          onClose={() => {
            this.setState({ deleteResult: null });
          }}
        >
          <Alert severity={'success'}>Record Deleted</Alert>
        </Snackbar>
      </>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(DataTable);
