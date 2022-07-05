import { Grid, MenuItem, Select, TableCell, TableFooter, TableRow } from '@material-ui/core';
import React from 'react';
import { trans } from '../../../../shared/resources/lang/translate';
import SliderButton from '../SliderButton';
import { IDataTableFooterProps } from '../../types/components';

class DataTableFooter extends React.Component<IDataTableFooterProps> {
  render = () => {
    const { dataCount, limit, fields, fetching } = this.props;
    const paginationButtonCount = Math.ceil(dataCount / limit);

    return (
      <TableFooter>
        {fetching ? (
          <TableRow>
            <TableCell>
              <strong>{trans('resource.fetching')}</strong>
            </TableCell>
          </TableRow>
        ) : (
          <TableRow>
            <TableCell colSpan={fields.length + 1}>
              {' '}
              {/** +1 comes from "Actions" section */}
              <Grid container direction="row" justifyContent="space-between">
                <Grid item md={4}>
                  <p>{dataCount > 0 ? trans('resource.countRecordsFound', { count: dataCount.toString() }) : trans('resource.dataNotFound')}</p>
                </Grid>
                {dataCount > 0 && (
                  <Grid container item md={5} justifyContent="flex-end">
                    <Grid item md={2}>
                      <Select
                        value={limit}
                        style={{ width: '100%' }}
                        onChange={(e) => {
                          const selectedLength = parseInt(e.target.value.toString());
                          if (limit !== selectedLength) {
                            this.props.dataLengthChange(selectedLength); // trigger the length change event for parent component
                          }
                        }}
                      >
                        <MenuItem value="30" key="30">
                          30
                        </MenuItem>
                        <MenuItem value="50" key="50">
                          50
                        </MenuItem>
                        <MenuItem value="100" key="100">
                          100
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item md={10} container justifyContent="flex-end">
                      <SliderButton
                        activeButton={this.props.currentPage}
                        buttonClickHandler={(page) => {
                          this.props.pageChange(page);
                        }}
                        buttonCount={paginationButtonCount}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </TableCell>
          </TableRow>
        )}
      </TableFooter>
    );
  };
}

export default DataTableFooter;
