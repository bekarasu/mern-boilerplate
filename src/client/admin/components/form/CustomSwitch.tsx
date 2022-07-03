import { Switch, SwitchProps } from '@material-ui/core';
import React from 'react';
import { FieldItem, IFieldItemState, IReduxFormProps } from '../../../../../@types/client/admin/form';
class CustomSwitch extends React.Component<SwitchProps & IReduxFormProps & FieldItem, IFieldItemState> {
  constructor(props) {
    super(props);
    this.state = {
      value:
        typeof this.props.initialValue === 'boolean' // check the type, if you set the value directly, it won't work properly.
          ? this.props.initialValue
          : this.props.initialValue == 'true',
    };
    const {
      input: { onChange },
    } = this.props;
    onChange(this.state.value); // required for redux-form handler
  }

  handleChange = () => {
    const {
      input: { onChange },
    } = this.props;
    onChange(!this.state.value); // required for redux-form handler
    this.setState({ value: !this.state.value });
  };

  render = () => {
    return (
      <>
        <span>{this.props.label}</span>
        <Switch
          value={this.state.value}
          checked={
            typeof this.state.value === 'boolean' // check the type, if you set the value directly, it won't work properly.
              ? this.state.value
              : this.state.value == 'true'
          }
          onChange={() => this.handleChange()}
        />
      </>
    );
  };
}

export default CustomSwitch;
