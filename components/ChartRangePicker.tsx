import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { MAX_CHART_DAYS, MIN_CHART_DAYS, RANGE_STEP_SIZE } from '../config';

interface PickerProps {
  chartRange: number;
  handleChartRangeChange: Function;
}

const RangePicker = styled.input`
  display: block;
  margin: auto;
  min-width: 300px;

  @media (max-width: 450px) {
    min-width: 0;
    width: calc(100% - 2rem);
    /* padding: 0 5rem; */
  }
`;

const ChartRangePicker: FunctionComponent<PickerProps> = ({ chartRange, handleChartRangeChange }) => {
  const handleChange = (e: any) => handleChartRangeChange(e);

  return (
    <RangePicker
      type={'range'}
      min={MIN_CHART_DAYS}
      max={MAX_CHART_DAYS}
      step={RANGE_STEP_SIZE}
      value={chartRange}
      onChange={handleChange}
    ></RangePicker>
  );
};

export default ChartRangePicker;
