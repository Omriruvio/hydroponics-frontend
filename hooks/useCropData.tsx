import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IUserAuth } from '../utils/auth';
import { MAX_CHART_DAYS } from '../utils/constants';
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

  const fetchCropData = useCallback(
    (days: number, user: IUserAuth) => {
      getCropData(days, user)
        .then((data) => {
          if (Array.isArray(data)) {
            const imageArray = parseImages(data);
            setImageData(imageArray);
            setMainChartData(parseCropData(data));
          }
        })
        .catch((err) => console.log(err));
    },
    [parseImages]
  );

  const handleRangeChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setChartRange(+value);
    fetchCropData(+value, currentUser);
  };

  useEffect(() => {
    if (!currentUser.isLoggedIn) return;
    fetchCropData(MAX_CHART_DAYS, currentUser);
  }, [currentUser, fetchCropData]);
  return { mainChartData, imageData, getCropData, chartRange, handleRangeChange };
};
