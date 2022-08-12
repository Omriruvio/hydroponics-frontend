import { FunctionComponent } from 'react';
import { XAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getColorRange, OutputRange } from '../utils/getColorRange';
import { ChartContainer, ChartProps, DisplayDays } from './UserChart';

const TemperatureChart: FunctionComponent<ChartProps> = ({ chartData, daysDisplayed }) => {
  const gradient: OutputRange = getColorRange({ tableData: chartData, dataField: 'temperature', goodMin: 10, goodMax: 30 });

  return (
    <>
      <DisplayDays>Displaying last {daysDisplayed} days of temperature data:</DisplayDays>
      <ChartContainer>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart width={750} height={300} data={chartData}>
            <XAxis dataKey='name' />
            <Tooltip />
            <Legend verticalAlign='top' height={50} iconSize={40} wrapperStyle={{ fontSize: '2rem' }} />
            <defs>
              <linearGradient id='splitColor' x1='0' y1='0' x2='0' y2='1'>
                <stop offset={gradient.top} stopColor='red' stopOpacity={0.7} />
                <stop offset={gradient.topGood} stopColor='green' stopOpacity={0.6} />
                <stop offset={gradient.bottomGood} stopColor='green' stopOpacity={0.6} />
                <stop offset={gradient.bottom} stopColor='blue' stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <Area type='monotone' dataKey='temperature' stroke='rgb(195, 79, 104' fill='url(#splitColor)' />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default TemperatureChart;
