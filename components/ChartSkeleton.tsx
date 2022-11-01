import { Skeleton, Stack } from '@mui/material';

const ChartSkeleton = () => {
  return (
    <Stack gap={0.3}>
      <Skeleton variant='rounded' animation='wave' width={'100%'} height={'49px'} sx={{ bgcolor: 'grey.900' }} />
      <Skeleton variant='rounded' animation='wave' width={'100%'} height={'49px'} sx={{ bgcolor: 'grey.900' }} />
      <Skeleton variant='rounded' animation='wave' width={'100%'} height={'49px'} sx={{ bgcolor: 'grey.900' }} />
      <Skeleton variant='rounded' animation='wave' width={'100%'} height={'49px'} sx={{ bgcolor: 'grey.900' }} />
    </Stack>
  );
};

export default ChartSkeleton;
