import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Tracker } from './components/Tracker';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Tracker />
    </StrictMode>
  );
}
