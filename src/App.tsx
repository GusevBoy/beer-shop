import React from 'react';
import './App.css';
import Beers from './pages/beers';
import Cart from './pages/cart';
import Beer from './pages/beer';
import { useRoutes} from 'react-router-dom';


const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: '/',
    element: <Beers />,
  };
  const cartRoutes = {
    path: '/cart',
    element: <Cart />,
  };

  const beerCardRoutes = {
    path: '/beer/:id',
    element: <Beer />,
  };

  const routing = useRoutes([mainRoutes, cartRoutes, beerCardRoutes]);

  return <div>{routing}</div>;
};

export default App;
