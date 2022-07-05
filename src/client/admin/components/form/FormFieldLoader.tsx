import { FormControl, MenuItem } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { IFormFieldLoaderProps } from '../../types/components';
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

    const { item, style } = this.props;
    const isHidden = item.type === 'hidden';

    switch (item.type) {
      case 'text':
      case 'number':
      case 'hidden':
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
        children = item.options.map((option, key) => {
          return (
            <MenuItem key={key} value={option.value}>
              {option.text}
            </MenuItem>
          );
        });
        break;
      default:
        component = 'Invalid Field Type: ' + item.type;
        break;
    }

    let label = null;
    if (!isHidden) {
      label = item.label ? trans('db.' + item.label) : trans('db.' + item.name);
    } else {
      style.display = 'none';
    }

    return (
      <FormControl style={style}>
        <Field hidden={isHidden} name={item.name} label={label || undefined} component={component} {...item}>
          {children !== null && children}
        </Field>
      </FormControl>
    );
  };
}

export default FormFieldLoader;
