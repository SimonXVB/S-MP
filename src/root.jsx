import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Main } from './main';
import { NavContext } from './context/navContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavContext>
      <Main />
    </NavContext>
  </StrictMode>,
);