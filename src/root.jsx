import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Main } from './main';
import { MainContextProvider } from './context/contextProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContextProvider>
      <Main />
    </MainContextProvider>
  </StrictMode>
);