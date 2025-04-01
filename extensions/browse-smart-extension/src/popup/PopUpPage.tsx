import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PopUp } from './components/PopUp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PopUp />
  </StrictMode>
);
