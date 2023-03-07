import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/storeConfig/store';
import './styles/index.scss';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { MetaMaskProvider } from './hooks/metamask'


function getLibrary(provider:any, connector:any) {
  return new Web3(provider)
}

ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetaMaskProvider>
          <App />
        </MetaMaskProvider>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
