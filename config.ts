// prettier-ignore
// defines api endpoints
export const BASE_URL =
  process.env.NEXT_PUBLIC_MAIN_API_URL_DEV ||
  process.env.NEXT_PUBLIC_MAIN_API_URL_PROD ||
  'http://localhost:3333';

// defines normal crop data ranges
export const NORMAL_DATA_RANGE_METRIC = {
  EC: { MIN: 700, MAX: 3000 },
  TEMPERATURE: { MIN: 18, MAX: 27 },
  HUMIDITY: { MIN: 45, MAX: 65 },
  PH: { MIN: 5, MAX: 6.5 },
};

// maximum days to show in the graphs
export const MAX_CHART_DAYS = 360;
// minimum days to show in the graphs
export const MIN_CHART_DAYS = 30;
// range picker step size
export const RANGE_STEP_SIZE = 30;
// range picker debounce time in ms
export const RANGE_PICKER_DEBOUNCE_DELAY_MS = 500;
// default chart margins
export const DEFAULT_CHART_MARGINS = { top: 5, left: -15, right: 10, bottom: 5 };
// default average metric values
export const DEFAULT_METRICS = {
  ec: 2500,
  temperature: 29,
  ph: 6.5,
  humidity: 50,
};
