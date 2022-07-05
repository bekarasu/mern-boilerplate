import { Grid } from '@material-ui/core';
import React from 'react';
import { FieldItem, ICustomFormProps } from '../../types/form';
import FormFieldLoader from './FormFieldLoader';

class CustomForm extends React.Component<ICustomFormProps> {
  render = () => {
    const formStyle: React.CSSProperties = {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    };
    const fieldStyle: React.CSSProperties = {
      margin: '10px 0',
    };
    const { footerComponent, items, handleSubmit, urlFromField } = this.props;
    console.log(urlFromField);

    return (
      <form style={formStyle} onSubmit={handleSubmit}>
        {items.map((item: FieldItem) => (
          <FormFieldLoader style={fieldStyle} key={item.name} item={item} />
        ))}
        {urlFromField != null && (
          <FormFieldLoader
            key={'urlFromField'}
            style={{}}
            item={{
              type: 'hidden',
              name: 'urlFromField',
              initialValue: urlFromField,
            }}
          />
        )}
        {footerComponent != null && (
          <Grid container direction="row" justifyContent="space-between" alignContent="center" style={fieldStyle}>
            {footerComponent}
          </Grid>
        )}
      </form>
    );
  };
}

export default CustomForm;
