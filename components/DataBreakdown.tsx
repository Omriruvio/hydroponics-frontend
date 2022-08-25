import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HydroponicsDataType } from '../utils/getColorRange';
import { RechartsTableData } from '../utils/parseCropData';
import EcChart from './EcChart';
import PhChart from './PhChart';
import TemperatureChart from './TemperatureChart';

type SplitCropData = { [k in HydroponicsDataType]: number } | { name: string };
type ISplitChartData = {
  [key in HydroponicsDataType]: Array<SplitCropData>;
};

const splitChartData = (data: RechartsTableData) => {
  const newData: ISplitChartData = { temperature: [], humidity: [], ph: [], ec: [] };
  for (const field of Object.keys(newData)) {
    const dataType = field as HydroponicsDataType;
    for (const message of data) {
      if (message[dataType] > 0) {
        newData[dataType].push({ name: message.name, [dataType]: message[dataType] });
      }
    }
  }
  return newData;
};

export const DataBreakdown: FunctionComponent<{
  chartData: RechartsTableData;
  daysDisplayed: number;
}> = ({ chartData, daysDisplayed }) => {
  const [chartsData, setChartsData] = useState<any>({ temperature: [], humidity: [], ph: [], ec: [] });
  useEffect(() => {
    setChartsData(splitChartData(chartData));
  }, [chartData]);

  return (
    <DataBreakdownContainer>
      <TemperatureChart chartData={chartsData.temperature} daysDisplayed={daysDisplayed}></TemperatureChart>
      <PhChart chartData={chartsData.ph} daysDisplayed={daysDisplayed} />
      <EcChart chartData={chartsData.ec} daysDisplayed={daysDisplayed} />
      {/* Humidity chart temporarily removed */}
      {/* <HumidityChart chartData={chartsData.humidity} daysDisplayed={daysDisplayed} /> */}
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
