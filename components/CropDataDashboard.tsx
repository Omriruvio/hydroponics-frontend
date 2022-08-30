import Image from 'next/image';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IUserContext } from '../hooks/useAuth';
import { useCropData } from '../hooks/useCropData';
import { Grower } from '../hooks/useGrowers';
import { StyledHeader } from '../styles/globalstyles';
import ChartRangePicker from './ChartRangePicker';
import { DataBreakdown } from './DataBreakdown';
import { DisplayDays } from './UserChart';

interface ICropDataDashboardProps {
  currentUser: IUserContext | Grower | null;
  isDisplayName?: Boolean;
}

const CropDataDashboard: FunctionComponent<ICropDataDashboardProps> = ({ currentUser, isDisplayName = false }) => {
  const { mainChartData, imageData, chartRange, handleRangeChange } = useCropData(currentUser);
  // const user = currentUser as Grower;
  return (
    <>
      <StyledHeader>{`User Dashboard ${isDisplayName ? ` - (${currentUser?.username})` : ''}`}</StyledHeader>
      <ChartRangePicker handleChartRangeChange={handleRangeChange} chartRange={chartRange}></ChartRangePicker>
      <DisplayDays>Displaying last {chartRange} days of data:</DisplayDays>
      {/* Combined chart currently commented out */}
      {/* <UserChart chartData={mainChartData} daysDisplayed={chartRange}></UserChart> */}
      <DataBreakdown chartData={mainChartData} daysDisplayed={chartRange} />
      <StyledHeader>Image Uploads</StyledHeader>
      <StyledUl>
        {imageData.map(({ _id, imageUrl, dateReceived }) => (
          <li key={_id + dateReceived}>
            <Image quality={100} objectFit='cover' width={'1600'} height={'900'} src={imageUrl} alt='user uploaded image'></Image>
            <ImageSentDateTag>{dateReceived.slice(0, 10)}</ImageSentDateTag>
          </li>
        ))}
      </StyledUl>
    </>
  );
};

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
