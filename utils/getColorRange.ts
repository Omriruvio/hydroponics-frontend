import { RechartsTableData } from './parseCropData';
type HydroponicsDataType = 'temperature' | 'ph' | 'ec' | 'humidity';
type GetColorRangeProps = { tableData: RechartsTableData; dataField: HydroponicsDataType; goodMin: number; goodMax: number };
export type OutputRange = { top: string; topGood: string; bottomGood: string; bottom: string };

/**
 * Receives chart data and data type (data field name) to parse
 * Receives minimum and maximum representing 'Good/Valid' range.
 * Returns gradient representation by percentages of each section.
 * e.g. input - { inMin = 10, inMax = 100, goodMin = 30, goodMax = 50 }
 *      output - { top: '0%', topGood: '55%', bottomGood: '78%', bottom: '100%' }
 */

export const getColorRange = ({ tableData, dataField, goodMin, goodMax }: GetColorRangeProps): OutputRange => {
  // get min and max values of specified data type from chart data
  const filteredData = tableData.map((field) => field[dataField]);
  const inMin = Math.min(...filteredData);
  const inMax = Math.max(...filteredData);

  // if inMin > goodMin or inMax < goodMin returns default gradient values
  if (inMin > goodMin && inMax < goodMin) return { top: '0%', topGood: '40%', bottomGood: '60%', bottom: '100%' };
  const range = inMax - inMin;
  const topPercent = Math.round(((inMax - goodMax) / range) * 100);
  const bottomPercent = Math.round(((goodMin - inMin) / range) * 100);
  const midPercent = 100 - topPercent - bottomPercent;
  const topGood = `${0 + topPercent}%`;
  const bottomGood = `${topGood + midPercent}%`;
  return { top: '0%', topGood, bottomGood, bottom: '100%' };
};
