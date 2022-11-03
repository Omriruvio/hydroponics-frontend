import { Slider } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { MAX_CHART_DAYS, MIN_CHART_DAYS, RANGE_STEP_SIZE } from '../config';

interface PickerProps {
  chartRange: number;
  onChartRangeChange: Function;
}

const RangePicker = styled(Slider)`
  display: block;
  margin: auto;
  /* min-width: 300px; */
  max-width: 50%;

  @media (max-width: 450px) {
    min-width: 0;
    width: calc(100% - 2rem);
    /* padding: 0 5rem; */
  }
`;

const ChartRangePicker: FunctionComponent<PickerProps> = ({ chartRange, onChartRangeChange }) => {
  const [range, setRange] = useState(chartRange);

  const handleChange = (e: any) => {
    setRange(e.target.value);
    onChartRangeChange(e);
  };

  return <RangePicker min={MIN_CHART_DAYS} max={MAX_CHART_DAYS} step={RANGE_STEP_SIZE} value={range} onChange={handleChange} />;
};

export default ChartRangePicker;
