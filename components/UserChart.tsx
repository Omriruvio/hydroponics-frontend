import { FunctionComponent } from 'react';
import { LineChart, Line, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { RechartsTableData } from '../utils/parseCropData';
import { CustomTooltip } from './CustomTooltip';
export interface ChartProps {
  chartData: RechartsTableData;
  daysDisplayed: number;
}

const UserChart: FunctionComponent<ChartProps> = ({ chartData, daysDisplayed }) => {
  return (
    <>
      <DisplayDays>Displaying last {daysDisplayed} days of data:</DisplayDays>
      <MainChartContainer>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart width={750} height={300} data={chartData}>
            <XAxis dataKey='name' />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign='top' height={50} iconSize={16} wrapperStyle={{ fontSize: '1rem' }} />
            <Line type='monotone' dataKey='ph' stroke='rgb(39, 68, 216)' activeDot={{ r: 6 }} />
            <Line type='monotone' dataKey='ec' stroke='rgb(234, 240, 67)' activeDot={{ r: 6 }} />
            <Line type='monotone' dataKey='humidity' stroke='rgb(233, 127, 22)' activeDot={{ r: 6 }} />
            <Line type='monotone' dataKey='temperature' stroke='rgb(195, 79, 104)' activeDot={{ r: 6 }} />
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
