import { FunctionComponent, useEffect, useState } from 'react';
import { XAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import { NORMAL_DATA_RANGE_METRIC } from '../utils/constants';
import { getColorRange, GradientBreakpoint } from '../utils/getColorRange';
import { ChartContainer, ChartProps, DisplayDays } from './UserChart';

const HumidityChart: FunctionComponent<ChartProps> = ({ chartData, daysDisplayed }) => {
  const [gradientBreakpoints, setGradientBreakpoints] = useState<GradientBreakpoint>({
    top: '0%',
    topNormal: '40%',
    bottomNormal: '60%',
    bottom: '100%',
  });

  useEffect(() => {
    const range = getColorRange({
      tableData: chartData,
      dataField: 'humidity',
      normalMin: NORMAL_DATA_RANGE_METRIC.HUMIDITY.MIN,
      normalMax: NORMAL_DATA_RANGE_METRIC.HUMIDITY.MAX,
    });
    setGradientBreakpoints(range);
  }, [chartData]);

  return (
    <>
      <DisplayDays>Displaying last {daysDisplayed} days of humidity data:</DisplayDays>
      <ChartContainer>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart width={750} height={300} data={chartData}>
            <XAxis dataKey='name' />
            <Tooltip />
            <Legend verticalAlign='top' height={50} iconSize={40} wrapperStyle={{ fontSize: '2rem' }} />
            <defs>
              <linearGradient id='humidity-chart-fill' x1='0' y1='0' x2='0' y2='1'>
                <stop offset={gradientBreakpoints.top} stopColor='LightSteelBlue' stopOpacity={0.5} />
                <stop offset={gradientBreakpoints.topNormal} stopColor='LightSeaGreen' stopOpacity={0.3} />
                <stop offset={gradientBreakpoints.bottomNormal} stopColor='LightSeaGreen' stopOpacity={0.3} />
                <stop offset={gradientBreakpoints.bottom} stopColor='red' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area type='monotone' dataKey='humidity' stroke='rgb(233, 127, 22)' fill='url(#humidity-chart-fill)' />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default HumidityChart;
