import Navbar from '../../components/Navbar';
import { useEffect } from 'react';
import { StyledHeader, StyledPage } from '../../styles/globalstyles';
import Image from 'next/image';
import styled from 'styled-components';
import ChartRangePicker from '../../components/ChartRangePicker';
import { DataBreakdown } from '../../components/DataBreakdown';
import { DisplayDays } from '../../components/UserChart';
import { useCropData } from '../../hooks/useCropData';
import { useAuth } from '../../hooks/useAuth';
import Router from 'next/router';

const UserDashboard = () => {
  const currentUser = useAuth();
  const { mainChartData, imageData, chartRange, handleRangeChange } = useCropData(currentUser);

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      Router.replace('/');
      return;
    }
  }, [currentUser]);

  return (
    currentUser.isLoggedIn && (
      <StyledPage>
        <Navbar></Navbar>
        <StyledHeader>User Dashboard</StyledHeader>
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
      </StyledPage>
    )
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

export default UserDashboard;
