import { FunctionComponent } from 'react';
import { LineChart, Line, XAxis, Tooltip, Legend, ResponsiveContainer, YAxis } from 'recharts';
import styled from 'styled-components';
import { DEFAULT_CHART_MARGINS } from '../config';
import { RechartsTableData } from '../utils/parseCropData';
import { CustomDot } from './CustomDot';
import { CustomTooltip } from './CustomTooltip';
export interface ChartProps {
  chartData: RechartsTableData;
  daysDisplayed: number;
  withYaxis?: boolean;
  chartMargins?: { top: number; left: number; right: number; bottom: number };
}

const UserChart: FunctionComponent<ChartProps> = ({ chartData, withYaxis, chartMargins = DEFAULT_CHART_MARGINS }) => {
  return (
    <>
      {/* <DisplayDays>Displaying last {daysDisplayed} days of data:</DisplayDays> */}
      <MainChartContainer>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart margin={chartMargins} width={750} height={300} data={chartData}>
            {withYaxis && <YAxis />}
            <XAxis dataKey='name' />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign='top' height={50} iconSize={16} wrapperStyle={{ fontSize: '1rem' }} />
            <Line
              dot={<CustomDot dataType='ph' size={40} offsetX={-10} offsetY={-10} />}
              type='monotone'
              dataKey='ph'
              stroke='rgb(39, 68, 216)'
              activeDot={{ r: 2 }}
            />
            <Line
              dot={<CustomDot dataType='ec' size={40} offsetX={-10} offsetY={-10} />}
              type='monotone'
              dataKey='ec'
              stroke='rgb(234, 240, 67)'
              activeDot={{ r: 2 }}
            />
            <Line
              dot={<CustomDot dataType='humidity' size={40} offsetX={-10} offsetY={-10} />}
              type='monotone'
              dataKey='humidity'
              stroke='rgb(233, 127, 22)'
              activeDot={{ r: 2 }}
            />
            <Line
              dot={<CustomDot dataType='temperature' size={40} offsetX={-10} offsetY={-10} />}
              type='monotone'
              dataKey='temperature'
              stroke='rgb(195, 79, 104)'
              activeDot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </MainChartContainer>
    </>
  );
};

export default UserChart;

export const MainChartContainer = styled.div`
  width: 100%;
  height: 250px;
  padding: 0 2rem;
  margin: auto;

  & .recharts-default-legend {
    font-size: 1.2rem;

    @media (min-width: 760px) {
      font-size: 1.5rem;
    }

    @media (min-width: 1000px) {
      font-size: 1.7rem;
    }
  }

  @media (min-width: 760px) {
    height: 450px;
  }

  @media (min-width: 1000px) {
    height: 600px;
  }
`;

export const DisplayDays = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: rgb(70, 70, 70);
`;
