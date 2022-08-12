import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { RechartsTableData } from '../utils/parseCropData';
import EcChart from './EcChart';
import HumidityChart from './HumidityChart';
import PhChart from './PhChart';
import TemperatureChart from './TemperatureChart';

export const DataBreakdown: FunctionComponent<{
  chartData: RechartsTableData;
  daysDisplayed: number;
}> = ({ chartData, daysDisplayed }) => {
  return (
    <DataBreakdownContainer>
      <TemperatureChart chartData={chartData} daysDisplayed={daysDisplayed}></TemperatureChart>
      <PhChart chartData={chartData} daysDisplayed={daysDisplayed} />
      <EcChart chartData={chartData} daysDisplayed={daysDisplayed} />
      <HumidityChart chartData={chartData} daysDisplayed={daysDisplayed} />
    </DataBreakdownContainer>
  );
};

const DataBreakdownContainer = styled.ul`
  padding: 0;
  list-style: none;
  width: 100%;
  display: grid;

  @media (min-width: 550px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (min-width: 1000px) {
    gap: 5rem;
  }
`;
