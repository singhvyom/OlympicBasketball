import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({alignment, handleChange, buttons}) {

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {buttons.map((button, index) => (
        <ToggleButton ke={index} value ={button.value}>
          {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}