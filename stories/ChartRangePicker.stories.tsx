// YourComponent.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

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
    onChange: {
      action: 'changed',
      control: {
        type: 'function',
      },
    },
  },
} as ComponentMeta<typeof ChartRangePicker>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<any> = (args) => {
  const [, updateArgs] = useArgs();

  return (
    <ChartRangePicker
      {...args}
      onChange={(e: any) => {
        updateArgs({ chartRange: e.target.value });
      }}
    />
  );
};
export const Initial = Template.bind({});

Initial.args = {
  chartRange: 30,
};

export const WithRange = Template.bind({});
WithRange.args = {
  chartRange: 90,
};

export const WithMaxRange = Template.bind({});
WithMaxRange.args = {
  chartRange: 360,
};

