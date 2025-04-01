import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Tracker } from './components/Tracker';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tracker />
  </StrictMode>
);
