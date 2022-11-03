import Image from 'next/image';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IUserContext } from '../hooks/useAuth';
import { useCropData } from '../hooks/useCropData';
import { Grower } from '../hooks/useGrowers';
import { usePopups } from '../hooks/usePopups';
import { System } from '../hooks/useSystems';
import { StyledDivider, StyledHeader } from '../styles/globalstyles';
import { HealthState, ImageData } from '../utils/parseCropData';
import ChartRangePicker from './ChartRangePicker';
import { DataBreakdown } from './DataBreakdown';
import { DisplayDays } from './UserChart';
import moment from 'moment';

interface ICropDataDashboardProps {
  currentUser: IUserContext | Grower | null;
  selectedSystem: System;
  isDisplayName?: Boolean;
}

const CropDataDashboard: FunctionComponent<ICropDataDashboardProps> = ({ currentUser, selectedSystem, isDisplayName = false }) => {
  const { mainChartData, imageData, chartRange, handleRangeChange } = useCropData(currentUser, selectedSystem._id);
  const popups = usePopups();
  const dashboardHeader = `User Dashboard ${isDisplayName ? ` - (${currentUser?.username})` : ''} ${
    selectedSystem.name ? ` - (${selectedSystem.name})` : ''
  }`;

  return (
    <>
      <StyledHeader>{dashboardHeader}</StyledHeader>
      <ChartRangePicker onChartRangeChange={handleRangeChange} chartRange={chartRange}></ChartRangePicker>
      <DisplayDays>Displaying last {chartRange} days of data:</DisplayDays>
      {/* Combined chart currently commented out */}
      {/* <UserChart chartData={mainChartData} daysDisplayed={chartRange}></UserChart> */}
      <DataBreakdown chartData={mainChartData} daysDisplayed={chartRange} />

      {imageData.length > 0 && (
        <>
          <StyledDivider />
          <StyledHeader>Image Uploads</StyledHeader>
          <StyledUl>
            {(imageData as ImageData[]).reduceRight((acc: JSX.Element[], { _id, imageUrl, dateReceived, healthState }: ImageData) => {
              acc.push(
                <ImageCardContainer key={_id + dateReceived}>
                  <Image
                    onClick={() => popups.handleSelectImage(imageUrl)}
                    quality={100}
                    objectFit='cover'
                    width={'1600'}
                    height={'900'}
                    src={imageUrl}
                    alt='user uploaded image'
                    style={{ cursor: 'pointer' }}
                  ></Image>
                  <ImageDetails health={healthState}>
                    <ImageSentDateTag>{moment(dateReceived).format('D/M/Y')}</ImageSentDateTag>
                    {/* <pre>{JSON.stringify(healthState)}</pre> */}
                  </ImageDetails>
                </ImageCardContainer>
              );
              return acc;
            }, [])}
          </StyledUl>
        </>
      )}
    </>
  );
};

const ImageCardContainer = styled.li`
  /* border: var(--mainGreen) 2px solid; */

  &:hover {
    /* border: var(--lightGreen) 2px solid; */
  }
`;

interface IImageDetailsProps {
  health?: HealthState;
  children?: JSX.Element | JSX.Element[];
}

const ImageDetails = styled.div<IImageDetailsProps>`
  padding: 0.5rem;
  border-top: ${(props) =>
    props.health?.isHealthy === 'positive'
      ? 'var(--lightGreen) 10px solid'
      : props.health?.hasPestPresence === 'positive' || props.health?.hasDeficiencies === 'positive'
      ? 'var(--errorRed) 10px solid'
      : 'transparent 10px solid'};
`;

const ImageSentDateTag = styled.span`
  display: block;
  width: 100%;
  font-size: 1rem;
  text-align: center;
`;

const StyledUl = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 100%;
  margin: 40px 2rem;
  place-items: center;

  li {
    overflow: hidden;
    list-style: none;
    width: 100%;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default CropDataDashboard;
