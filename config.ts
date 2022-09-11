// export const BASE_URL = 'https://39ad-176-228-28-109.eu.ngrok.io';
// prettier-ignore
export const BASE_URL = process.env.NEXT_PUBLIC_MAIN_API_URL_DEV || process.env.NEXT_PUBLIC_MAIN_API_URL_PROD;

export const NORMAL_DATA_RANGE_METRIC = {
  EC: { MIN: 700, MAX: 3000 },
  TEMPERATURE: { MIN: 18, MAX: 27 },
  HUMIDITY: { MIN: 45, MAX: 65 },
  PH: { MIN: 5, MAX: 6.5 },
};

export const MAX_CHART_DAYS = 28;
export const MIN_CHART_DAYS = 7;
export const RANGE_STEP_SIZE = 7;

export const RANGE_PICKER_DEBOUNCE_DELAY_MS = 500;

export const DEFAULT_CHART_MARGINS = { top: 5, left: -15, right: 10, bottom: 5 };
