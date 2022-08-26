import debounce from 'lodash.debounce';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IUserAuth } from '../utils/auth';
import { MAX_CHART_DAYS, RANGE_PICKER_DEBOUNCE_DELAY_MS } from '../config';
import { getCropData } from '../utils/cropData';
import { parseCropData, RechartsTableData } from '../utils/parseCropData';
import { useAuth } from './useAuth';

interface ImageData {
  _id: string;
  imageUrl: string;
  dateReceived: string;
}

export const useCropData = () => {
  const [imageData, setImageData] = useState<ImageData[] | []>([]);
  const [mainChartData, setMainChartData] = useState<RechartsTableData>([]);
  const [chartRange, setChartRange] = useState(MAX_CHART_DAYS);
  const currentUser = useAuth();

  const parseImages = useCallback((data: ImageData[]) => {
    if (Array.isArray(data)) {
      return data.reduce<ImageData[]>((acc, message) => {
        const { imageUrl, dateReceived, _id } = message;
        if (imageUrl) acc.push({ _id, imageUrl, dateReceived });
        return acc;
      }, []);
    } else return [];
  }, []);

  const updateCharts = useCallback(
    (data: unknown) => {
      if (Array.isArray(data)) {
        setImageData(parseImages(data));
        setMainChartData(parseCropData(data));
      }
    },
    [parseImages]
  );

  const fetchCropData = useCallback(
    (days: number, user: IUserAuth) => {
      return getCropData(days, user)
        .then(updateCharts)
        .catch((err) => console.log(err));
    },
    [updateCharts]
  );

  const debounceFetchCropData = useMemo(() => {
    return debounce(fetchCropData, RANGE_PICKER_DEBOUNCE_DELAY_MS);
  }, [fetchCropData]);

  const handleRangeChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setChartRange(+value);
    debounceFetchCropData(+value, currentUser);
  };

  useEffect(() => {
    if (!currentUser.isLoggedIn) return;
    fetchCropData(MAX_CHART_DAYS, currentUser);
  }, [currentUser, fetchCropData]);
  return { mainChartData, imageData, getCropData, chartRange, handleRangeChange };
};
