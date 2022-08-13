// import { NORMAL_DATA_RANGE_METRIC } from './constants';
import { HydroponicsDataType } from './getColorRange';

const NORMAL_DATA_RANGE_METRIC = {
  EC: { MIN: 700, MAX: 3000 },
  TEMPERATURE: { MIN: 18, MAX: 27 },
  HUMIDITY: { MIN: 45, MAX: 65 },
  PH: { MIN: 5, MAX: 6.5 },
};

/**
 * Returns boolean concluding whether the data of specified type is within normal range.
 * @param value number representing crop data
 * @param dataType string representing crop data type
 */

export const isInNormalRange = (value: number[], dataType: HydroponicsDataType): boolean => {
  const compareValue = value[1] || value;
  switch (dataType) {
    case 'temperature':
      const conditionTemp = NORMAL_DATA_RANGE_METRIC.TEMPERATURE.MAX >= compareValue && compareValue >= NORMAL_DATA_RANGE_METRIC.TEMPERATURE.MIN;
      return conditionTemp;
    case 'ec':
      const conditionEc = NORMAL_DATA_RANGE_METRIC.EC.MAX >= compareValue && compareValue >= NORMAL_DATA_RANGE_METRIC.EC.MIN;
      return conditionEc;
    case 'humidity':
      const conditionHum = NORMAL_DATA_RANGE_METRIC.HUMIDITY.MAX >= compareValue && compareValue >= NORMAL_DATA_RANGE_METRIC.HUMIDITY.MIN;
      return conditionHum;
    case 'ph':
      const conditionPh = NORMAL_DATA_RANGE_METRIC.PH.MAX >= compareValue && compareValue >= NORMAL_DATA_RANGE_METRIC.PH.MIN;
      return conditionPh;
    default:
      console.log('Invalid data for normal range check.');
      return false;
  }
};
