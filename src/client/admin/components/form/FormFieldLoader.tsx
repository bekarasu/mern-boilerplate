import { FormControl, MenuItem } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { IFormFieldLoaderProps } from '../../../../../@types/client/admin/components';
import { trans } from '../../../../shared/resources/lang/translate';
import CustomSwitch from './CustomSwitch';
import CustomTextInput from './CustomTextInput';
import ImageUploader from './ImageUploader';
import SelectField from './SelectField';
import WYSIWYG from './WYSIWYG';

class FormFieldLoader extends React.Component<IFormFieldLoaderProps> {
  render = () => {
    let component = null;
    let children = null;

    switch (this.props.item.type) {
      case 'text':
      case 'number':
        component = CustomTextInput;
        break;
      case 'wysiwyg':
        component = WYSIWYG;
        break;
      case 'switch':
        component = CustomSwitch;
        break;
      case 'image':
        component = ImageUploader;
        break;
      case 'select': // don't use default rendering
        component = SelectField;
        children = this.props.item.options.map((option, key) => {
          return (
            <MenuItem key={key} value={option.value}>
              {option.text}
            </MenuItem>
          );
        });
        break;
      default:
        component = 'Invalid Field Type: ' + this.props.item.type;
        break;
    }

    return (
      <FormControl style={this.props.style}>
        <Field
          name={this.props.item.name}
          label={this.props.item.label ? trans('db.' + this.props.item.label) : trans('db.' + this.props.item.name)}
          component={component}
          {...this.props.item}
        >
          {children !== null && children}
        </Field>
      </FormControl>
    );
  };
}

export default FormFieldLoader;
