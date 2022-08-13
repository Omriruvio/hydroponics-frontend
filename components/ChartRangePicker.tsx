import { FunctionComponent } from 'react';
import styled from 'styled-components';

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
  return (
    <>
      <RangePicker type={'range'} min={7} max={28} step={7} value={chartRange} onChange={(e) => handleChartRangeChange(e)}></RangePicker>
    </>
  );
};

export default ChartRangePicker;
