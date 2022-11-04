import { Slider } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { MAX_CHART_DAYS, MIN_CHART_DAYS, RANGE_STEP_SIZE } from '../config';

interface PickerProps {
  chartRange: number;
  onChartRangeChange: Function;
}

const PrettoSlider = styled(Slider)({
  alignSelf: 'center',
  maxWidth: '50%',
  color: 'var(--mainGreen)',
  // color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    // backgroundColor: '#b4f5b4',
    backgroundColor: 'var(--lightGreen)',
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: 'var(--lightGreen)',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: 'var(--mainGreen)',
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
  // media queries
  '@media (max-width: 450px)': {
    minWidth: 0,
    width: 'calc(100 % - 2rem)',
  },
});

const ChartRangePicker: FunctionComponent<PickerProps> = ({ chartRange, onChartRangeChange }) => {
  const [range, setRange] = useState(chartRange);

  const handleChange = (e: any) => {
    setRange(e.target.value);
    onChartRangeChange(e);
  };

  return (
    <PrettoSlider valueLabelDisplay='auto' min={MIN_CHART_DAYS} max={MAX_CHART_DAYS} step={RANGE_STEP_SIZE} value={range} onChange={handleChange} />
  );
};

export default ChartRangePicker;
