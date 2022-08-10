import Navbar from '../../components/Navbar';
import UserChart from '../../components/UserChart';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { StyledHeader, StyledPage } from '../../styles/globalstyles';
import { getCropData } from '../../utils/cropData';
import { parseCropData } from '../../utils/parseCropData';
import Image from 'next/image';
import styled from 'styled-components';
import { initialData } from '../../utils/chartSettings';
import { ChartData } from 'chart.js';
import ChartRangePicker from '../../components/ChartRangePicker';

interface ImageData {
  _id: string;
  imageUrl: string;
  dateReceived: string;
}

const UserDashboard = () => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [chartData, setChartData] = useState<ChartData<'line'>>(initialData);
  const [chartRange, setChartRange] = useState(28);
  const currentUser = useContext(CurrentUserContext);
  const router = useRouter();

  const handleChartRangeChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setChartRange(+target.value);
  };

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      router.replace('/signin');
      return;
    }
    getCropData(chartRange, currentUser)
      .then((data) => {
        if (Array.isArray(data)) {
          const imageArray = data.reduce((acc, message) => {
            const { imageUrl, dateReceived } = message;
            if (imageUrl) acc.push({ imageUrl, dateReceived });
            return acc;
          }, []);
          setImageData(imageArray);
          const { labels, temperatures, humidities, phs, ecs } = parseCropData(data);
          setChartData({
            labels,
            datasets: [
              {
                label: 'Temperature',
                data: temperatures,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
              },
              {
                label: 'Humidity',
                data: humidities,
                borderColor: 'rgb(233, 127, 22)',
                backgroundColor: 'rgba(233, 127, 22, 0.5)',
                yAxisID: 'y',
              },
              {
                label: 'PH',
                data: phs,
                borderColor: 'rgb(39, 68, 216)',
                backgroundColor: 'rgba(39, 68, 216, 0.5)',
                yAxisID: 'y',
              },
              {
                label: 'EC',
                data: ecs,
                borderColor: 'rgb(234, 240, 67)',
                backgroundColor: 'rgba(234, 240, 67, 0.5)',
                yAxisID: 'y',
              },
            ],
          });
        }
      })
      .catch((err) => console.log(err));
  }, [router, currentUser, chartRange]);
  return (
    currentUser.isLoggedIn && (
      <StyledPage>
        <Navbar></Navbar>
        <StyledHeader>User Dashboard</StyledHeader>
        <ChartRangePicker handleChartRangeChange={handleChartRangeChange} chartRange={chartRange}></ChartRangePicker>
        <UserChart chartData={chartData} daysDisplayed={chartRange}></UserChart>
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
