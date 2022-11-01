import { Typography } from '@mui/material';
import { Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { BASE_URL, DEFAULT_METRICS } from '../config';
import { usePopups } from '../hooks/usePopups';
import { UserMessage } from '../utils/parseCropData';
import BasicGrid from './BasicGrid';
import ImageWithSkeleton from './ImageWithSkeleton';

interface Metrics {
  ec: number | boolean;
  temperature: number | boolean;
  ph: number | boolean;
  humidity?: number | boolean;
}

// general total active growers, latest photos, average current parameters
const GlobalSummary: React.FC<{ activeUserCount: { activeUsers: number } }> = ({ activeUserCount }) => {
  const [photoMessages, setPhotoMessages] = useState<UserMessage[]>([]);
  const [averageMetrics, setAverageMetrics] = useState<Metrics>(DEFAULT_METRICS);
  const popups = usePopups();
  useEffect(() => {
    const getLatestPhotos = async () => {
      // /last-x-photo-messages
      const res = await fetch(`${BASE_URL}/last-x-photo-messages`);
      const photos = await res.json();
      const arrayOfImageElements = photos.map((photo: UserMessage) => {
        if (!photo.imageUrl) return;
        return photo;
      });
      setPhotoMessages(arrayOfImageElements);
    };
    getLatestPhotos();

    const getAverageMetrics = async () => {
      // /average-metrics
      const res = await fetch(`${BASE_URL}/average-metrics`);
      const metrics = await res.json();
      // TODO: correct server side null data
      setAverageMetrics({
        ec: metrics.ec || DEFAULT_METRICS.ec,
        temperature: metrics.temperature || DEFAULT_METRICS.temperature,
        ph: metrics.ph || DEFAULT_METRICS.ph,
        humidity: metrics.humidity || DEFAULT_METRICS.humidity,
      });
    };
    getAverageMetrics();
  }, []);

  return (
    <>
      <BasicGrid
        data={[
          <Typography key={1} variant='h5'>
            Amount of active users past week: {String(activeUserCount.activeUsers)}
          </Typography>,
          <Stack direction='row' spacing={2} key={2} justifyContent='center'>
            <Chip size='medium' variant='outlined' label={<Typography sx={{ color: 'white' }}>{`Avg. EC: ${averageMetrics.ec}`}</Typography>} />
            <Chip
              size='medium'
              variant='outlined'
              label={<Typography sx={{ color: 'white' }}>{`Avg. temp: ${averageMetrics.temperature}`}</Typography>}
            />
            <Chip size='medium' variant='outlined' label={<Typography sx={{ color: 'white' }}>{`Avg. PH: ${averageMetrics.ph}`}</Typography>} />
          </Stack>,
          <Typography key={3} variant='h4'>
            Latest Photos
          </Typography>,
        ]}
        xs={12}
        spacing={2}
      />
      <BasicGrid
        data={photoMessages.reduce((acc, photo) => {
          if (!photo.imageUrl) return acc;
          acc.push(
            <ImageWithSkeleton
              key={photo._id}
              layout='responsive'
              objectFit='cover'
              src={photo.imageUrl}
              alt='latest photo'
              width={1600}
              height={900}
              onClick={() => popups.handleSelectImage(photo.imageUrl!)}
            />
          );
          return acc;
        }, [] as React.ReactNode[])}
        xs={4}
        spacing={2}
      />
    </>
  );
};

export { GlobalSummary };
