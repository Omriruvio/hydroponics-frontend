import { RechartsTableData } from './parseCropData';
type HydroponicsDataType = 'temperature' | 'ph' | 'ec' | 'humidity';
type GetColorRangeProps = { tableData: RechartsTableData; dataField: HydroponicsDataType; normalMin: number; normalMax: number };
export type GradientBreakpoint = { top: string; topNormal: string; bottomNormal: string; bottom: string };

/**
 * Receives chart data and data type (data field name) to parse
 * Receives minimum and maximum representing 'Normal/Valid' range.
 * Returns gradient breakpoint representation by percentages of each section.
 * e.g. input - { inMin = 10, inMax = 100, normalMin = 30, normalMax = 50 }
 *      output - { top: '0%', topNormal: '55%', bottomNormal: '78%', bottom: '100%' }
 * Invalid input returns an all 0% breakpoint range.
 */

export const getColorRange = ({ tableData, dataField, normalMin, normalMax }: GetColorRangeProps): GradientBreakpoint => {
  // get min and max values of specified data type from chart data
  const filteredData = tableData.map((field) => field[dataField]);
  const inMin = Math.min(...filteredData);
  const inMax = Math.max(...filteredData);

  // if inMin > normalMin or inMax < normalMin returns default gradient values
  if (inMin > normalMax || inMax < normalMin) return { top: '0%', topNormal: '0%', bottomNormal: '0%', bottom: '0%' };
  const range = inMax - inMin;
  const topPercent = Math.round(((inMax - normalMax) / range) * 100);
  const bottomPercent = Math.round(((normalMin - inMin) / range) * 100);
  const midPercent = 100 - topPercent - bottomPercent;
  const topNormal = `${0 + topPercent < 0 ? 0 : 0 + topPercent}%`;
  const bottomNormal = `${0 + topPercent + midPercent > 100 ? 100 : 0 + topPercent + midPercent}%`;
  return { top: '0%', topNormal, bottomNormal, bottom: '100%' };
};
