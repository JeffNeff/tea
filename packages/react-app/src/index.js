import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { Container } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>  
      <MantineProvider 
      theme={{
        fontFamily: "Noto Sans, sans-serif",
        components: {
          Container: {
            defaultProps: {
              xl: 1800
            }
          }
        }
      }}
      >
        <App />
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
