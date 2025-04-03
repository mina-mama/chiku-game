import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import App from './App.js'
import CalcGame from './CalcGame.js';
import HiraganaSelect from './HiraganaSelect.js';

const router = createHashRouter([
  {
    path: "/",
    children: [
      { index: true, Component: App },
      {
        path: "calc-game",
        Component: CalcGame,
      },
      {
        path: "hiragana-select",
        Component: HiraganaSelect,
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
