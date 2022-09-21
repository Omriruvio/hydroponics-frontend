import debounce from 'lodash.debounce';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IUserAuth } from '../utils/auth';
import { MAX_CHART_DAYS, RANGE_PICKER_DEBOUNCE_DELAY_MS } from '../config';
import { getCropData } from '../utils/cropData';
import { ImageData, parseCropData, parseImages, RechartsTableData } from '../utils/parseCropData';
import { useAuth, UserData } from './useAuth';
import { Grower } from './useGrowers';

export const useCropData = (selectedUser: UserData | Grower | null, systemId: string) => {
  const [imageData, setImageData] = useState<ImageData[] | []>([]);
  const [mainChartData, setMainChartData] = useState<RechartsTableData>([]);
  const [chartRange, setChartRange] = useState(MAX_CHART_DAYS);
  const currentUser = useAuth();

  const updateCharts = useCallback((data: unknown) => {
    if (Array.isArray(data)) {
      setImageData(parseImages(data));
      setMainChartData(parseCropData(data));
    }
  }, []);

  const fetchCropData = useCallback(
    (days: number, user: IUserAuth, systemId: string | undefined) => {
      return getCropData(days, user, systemId)
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
    selectedUser && debounceFetchCropData(+value, selectedUser, systemId);
  };

  useEffect(() => {
    if (!currentUser.isLoggedIn) return;
    selectedUser && fetchCropData(MAX_CHART_DAYS, selectedUser, systemId);
  }, [currentUser, selectedUser, fetchCropData, systemId]);
  return { mainChartData, imageData, getCropData, chartRange, handleRangeChange };
};
