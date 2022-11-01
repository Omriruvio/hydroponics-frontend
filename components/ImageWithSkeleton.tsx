import { Skeleton } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  style?: React.CSSProperties;
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive';
  onClick?: () => void;
};

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  quality = 100,
  objectFit = 'cover',
  style,
  layout,
  onClick,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {!imageLoaded && (
        <Skeleton variant='rectangular' animation='wave' sx={{ bgcolor: 'grey.800', position: 'absolute', zIndex: '1' }}>
          <Image width={width} height={height} src={src} alt={alt} />
        </Skeleton>
      )}
      <Image
        onLoadingComplete={() => setImageLoaded(true)}
        onClick={onClick}
        quality={quality}
        objectFit={objectFit}
        width={width}
        height={height}
        src={src}
        alt={alt}
        loading={'eager'}
        layout={layout}
        {...props}
      />
    </div>
  );
};

export default ImageWithSkeleton;
