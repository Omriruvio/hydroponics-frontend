import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
  background-color: rgb(41, 63, 52);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 8px 16px 23px 3px rgba(0, 0, 0, 0.5);
  font-size: 1.1rem;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledTooltipHeader = styled.span`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
  font-weight: 600;
`;

export const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>): JSX.Element => {
  if (active) {
    return (
      <TooltipWrapper>
        <StyledTooltipHeader>{label}</StyledTooltipHeader>
        <StyledUl>
          {payload?.map((dataItem, i) => (
            <li key={dataItem.payload + dataItem.name + i}>
              {dataItem.name}: {dataItem.value}
            </li>
          ))}
        </StyledUl>
      </TooltipWrapper>
    );
  }
  return <></>;
};
