import { FunctionComponent, useEffect, useState } from 'react';
import { XAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import { GridChartContainer } from '../styles/globalstyles';
import { DEFAULT_CHART_MARGINS, NORMAL_DATA_RANGE_METRIC } from '../config';
import { getColorRange, GradientBreakpoint } from '../utils/getColorRange';
import { CustomDot } from './CustomDot';
import { CustomTooltip } from './CustomTooltip';
import { ChartProps } from './UserChart';
import ChartSkeleton from './ChartSkeleton';

const HumidityChart: FunctionComponent<ChartProps> = ({ chartData, withYaxis, chartMargins = DEFAULT_CHART_MARGINS }) => {
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
    (chartData?.length > 0 && (
      <GridChartContainer>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart margin={chartMargins} width={750} height={300} data={chartData}>
            {withYaxis && <YAxis />}
            <XAxis dataKey='name' />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign='top' height={50} iconSize={16} wrapperStyle={{ fontSize: '1rem' }} />
            <defs>
              <linearGradient id='humidity-chart-fill' x1='0' y1='0' x2='0' y2='1'>
                <stop offset={gradientBreakpoints.top} stopColor='LightSteelBlue' stopOpacity={0.5} />
                <stop offset={gradientBreakpoints.topNormal} stopColor='LightSeaGreen' stopOpacity={0.3} />
                <stop offset={gradientBreakpoints.bottomNormal} stopColor='LightSeaGreen' stopOpacity={0.3} />
                <stop offset={gradientBreakpoints.bottom} stopColor='red' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dot={<CustomDot dataType='humidity' size={40} offsetX={-10} offsetY={-10} />}
              type='monotone'
              dataKey='humidity'
              stroke='rgb(233, 127, 22)'
              fill='url(#humidity-chart-fill)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </GridChartContainer>
    )) || <ChartSkeleton />
  );
};

export default HumidityChart;
