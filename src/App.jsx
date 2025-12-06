import './App.css';
import { AppRouter } from './routes.config';
import { RouterProvider } from 'react-router-dom';


function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App
