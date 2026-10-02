import { createBrowserRouter } from 'react-router-dom';
import Root from './layouts/Root';
import Home from './pages/Home';
import Rides from './pages/Rides';
import RideDetail from './pages/RideDetail';
import Ranking from './pages/Ranking';
import Reviews from './pages/Reviews';
import About from './pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'brinquedos', Component: Rides },
      { path: 'brinquedos/:id', Component: RideDetail },
      { path: 'ranking', Component: Ranking },
      { path: 'avaliacoes', Component: Reviews },
      { path: 'sobre', Component: About },
      { path: '*', Component: Home },
    ],
  },
]);
