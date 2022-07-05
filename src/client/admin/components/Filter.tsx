import { Button, createStyles, Grid, StyledComponentProps, withStyles } from '@material-ui/core';
import React from 'react';
import { reduxForm } from 'redux-form';
import { store } from '..';
import { IFilterProps, IFilterState } from '../types/components';
import { IFilter, IFormPostRequestFields } from '../types/form';
import { ITheme } from '../types/theme';
import { trans } from '../../../shared/resources/lang/translate';
import { setFilter } from '../store/filter/actions';
import CustomForm from './form/CustomForm';
import FilterListIcon from '@material-ui/icons/FilterList';

class FilterFormFooter extends React.Component<StyledComponentProps> {
  render = () => {
    const submitStyle: React.CSSProperties = {
      marginLeft: 'auto',
      marginTop: '10px',
    };
    return (
      <>
        <Grid>
          {/* TODO reset the filter fields */}
          <Button
            type="button"
            style={submitStyle}
            variant="contained"
            className={this.props.classes.resetButton}
            onClick={(): void => {
              store.dispatch(setFilter({ fields: [] }));
            }}
          >
            {/* TODO localization */}
            Clear Filter
          </Button>
        </Grid>
        <Grid>
          <Button type="submit" style={submitStyle} variant="contained" color="primary">
            {trans('resource.filter')}
          </Button>
        </Grid>
      </>
    );
  };
}

const styles = (theme: ITheme) =>
  createStyles({
    resetButton: {
      backgroundColor: theme.palette.third.main,
      color: theme.palette.third.contrastText,
    },
  });

const HOCFilterFormFooter = withStyles(styles)(FilterFormFooter);

const filterForm = (props) => {
  const { handleSubmit, items } = props;
  return <CustomForm footerComponent={<HOCFilterFormFooter />} handleSubmit={handleSubmit} items={items} />;
};

const FilterFormRedux: any = reduxForm({
  form: 'filterForm',
})(filterForm);

class Filter extends React.Component<IFilterProps, IFilterState> {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
    };
  }

  showFilter = (filter: boolean) => this.setState({ showFilter: !filter });

  submit = (requestFields: IFormPostRequestFields) => {
    const filters: Array<IFilter> = [];
    let count = 0;
    for (const key in requestFields) {
      filters[count] = {
        name: key,
        value: requestFields[key],
      };
      count++;
    }
    store.dispatch(setFilter({ fields: filters }));
  };

  render = () => {
    const filterStyle: React.CSSProperties = {
      margin: '20px 0px',
    };
    return (
      <Grid container direction="column" style={filterStyle}>
        <Grid item md={3}>
          {/* TODO localization */}
          <Button
            onClick={() => {
              this.showFilter(this.state.showFilter);
            }}
          >
            <FilterListIcon />
            Filter
          </Button>
        </Grid>
        {this.state.showFilter && (
          <Grid item md={12} container justifyContent="center">
            <Grid item md={9}>
              {/* TODO add "like" operator support */}
              <FilterFormRedux onSubmit={this.submit} items={this.props.items} />
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  };
}

export default Filter;
