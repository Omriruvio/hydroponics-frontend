import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'inherit',
}));

export type BasicGridProps = {
  data: React.ReactNode[];
  xs: number;
  spacing: number;
};

const BasicGrid: React.FC<BasicGridProps> = ({ data, xs, spacing }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={spacing}>
        {data.map((item, index) => (
          <Grid xs={xs} key={index} component={Item}>
            <Item>{item}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BasicGrid;
