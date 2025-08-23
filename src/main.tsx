import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { Provider } from 'react-redux';
import store from './store.ts';

import { PrimeReactProvider } from 'primereact/api';

const theme = createTheme({
  focusRing: 'never',
  fontFamily: 'Poppins, sans-serif',
  headings: { fontFamily: 'Merriweather, serif' },
  colors: {
    primary: [
      '#f1fcfa',
      '#cff8ef',
      '#9ff0e1',
      '#67e1cf',
      '#32b9a9',
      '#1fad9f',
      '#168b82',
      '#166f69',
      '#165955',
      '#174a47',
      '#072c2b',
    ],
    neutral: [
      '#f6f6f6',
      '#e7e7e7',
      '#d1d1d1',
      '#b0b0b0',
      '#888888',
      '#6d6d6d',
      '#5d5d5d',
      '#4f4f4f',
      '#454545',
      '#3d3d3d',
      '#000000',
    ],
  },
  primaryColor: 'primary',
  primaryShade: 4,
  defaultGradient: { from: 'primary.4', to: 'primary.8', deg: 132 },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <PrimeReactProvider>
            <Notifications position="top-center" />
            <App />
          </PrimeReactProvider>
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
