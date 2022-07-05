import { Switch, SwitchProps } from '@material-ui/core';
import React from 'react';
import { FieldItem, IFieldItemState, IReduxFormProps } from '../../types/form';
class CustomSwitch extends React.Component<SwitchProps & IReduxFormProps & FieldItem, IFieldItemState> {
  constructor(props) {
    super(props);
    this.state = {
      value: typeof this.props.initialValue === 'boolean' ? this.props.initialValue : this.props.initialValue == 'true',
    };
    const {
      input: { onChange },
    } = this.props;
    onChange(this.state.value);
  }

  handleChange = () => {
    const {
      input: { onChange },
    } = this.props;
    onChange(!this.state.value);
    this.setState({ value: !this.state.value });
  };

  render = () => {
    return (
      <>
        <span>{this.props.label}</span>
        <Switch
          value={this.state.value}
          checked={typeof this.state.value === 'boolean' ? this.state.value : this.state.value == 'true'}
          onChange={() => this.handleChange()}
        />
      </>
    );
  };
}

export default CustomSwitch;
