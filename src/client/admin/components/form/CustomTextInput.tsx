import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import { FieldItem, IFieldItemState, IReduxFormProps } from '../../../../../@types/client/admin/form';

class CustomTextInput extends React.Component<TextFieldProps & IReduxFormProps & FieldItem, IFieldItemState> {
  constructor(props: TextFieldProps & IReduxFormProps & FieldItem) {
    super(props);
    this.state = {
      value: this.props.initialValue ?? '',
    };
    const {
      input: { onChange },
    } = this.props;
    onChange(this.state.value);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      input: { onChange },
    } = this.props;
    onChange(e.target.value);
    this.setState({ value: e.target.value });
  };

  render = () => {
    return <TextField label={this.props.label} value={this.state.value} type={this.props.type} onChange={(e) => this.handleChange(e)}></TextField>;
  };
}

export default CustomTextInput;
