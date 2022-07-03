import { InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

const SelectField = ({ input, label, ...custom }) => (
  <>
    <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
    <Select {...input} {...custom}>
      {custom.options.map((option: { value: string | number; text: string }, key: string) => {
        return (
          <MenuItem key={key} value={option.value}>
            {option.text}
          </MenuItem>
        );
      })}
    </Select>
  </>
);

export default SelectField;
