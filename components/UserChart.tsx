import { Line } from 'react-chartjs-2';
import { options } from '../utils/chartSettings';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  ChartData,
} from 'chart.js';
import { FunctionComponent } from 'react';

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

interface ChartProps {
  chartData: ChartData<'line'>;
  daysDisplayed: number;
}

const ChartContainer = styled.div`
  padding: 0 2rem;
  margin: auto;

  @media (min-width: 760px) {
    max-width: 75%;
  }
`;

const DisplayDays = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: rgb(70, 70, 70);
`;

const UserChart: FunctionComponent<ChartProps> = ({ chartData, daysDisplayed }) => {
  return (
    <>
      <DisplayDays>Displaying last {daysDisplayed} days of data:</DisplayDays>
      <ChartContainer>
        <Line options={options} data={chartData}></Line>
      </ChartContainer>
    </>
  );
};

export default UserChart;
