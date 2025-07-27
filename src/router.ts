import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

export const router = createHashRouter([
  {
    path: '/',
    panel: 'cats',
  },
  {
    path: '/filters',
    panel: 'filters',
  },
  {
    path: '/cat/:id',
    panel: 'cats',
    modal: 'cat-detail',
  },
]);
