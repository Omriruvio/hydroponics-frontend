// YourComponent.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ChartRangePicker from '../components/ChartRangePicker';

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Main/ChartRangePicker',
  component: ChartRangePicker,
  argTypes: {
    chartRange: {
      control: {
        type: 'range',
        min: 30,
        max: 360,
        step: 30,
      },
    },
    onChartRangeChange: { action: 'changed' },
  },
} as ComponentMeta<typeof ChartRangePicker>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ChartRangePicker> = (args) => {
  return <ChartRangePicker {...args} />;
};
export const Original = Template.bind({});

Original.args = {
  /* 👇 The args you need here will depend on your component */
  chartRange: 60,
};
