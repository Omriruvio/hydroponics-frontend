// add styled components
import { GlobalStyles } from '../styles/globalstyles';
import '@storybook/addon-console';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// apply decorator to all stories
export const decorators = [
  (Story) => (
    <div
      style={{
        margin: '5em',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <GlobalStyles />
      <Story />
    </div>
  ),
];
