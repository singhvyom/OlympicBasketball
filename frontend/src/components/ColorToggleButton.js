import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({alignment, handleChange}) {
  // const [alignment, setAlignment] = React.useState('points');

  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="points">Points</ToggleButton>
      <ToggleButton value="rebounds">Rebounds</ToggleButton>
      <ToggleButton value="assists">Assists</ToggleButton>
    </ToggleButtonGroup>
  );
}