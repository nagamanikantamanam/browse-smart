import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PopUp } from './components/PopUp';
const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <PopUp />
    </StrictMode>
  );
}
