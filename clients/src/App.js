
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import MainLayout from './components/MainLayout';
import useBasicRoute from "./components/routes/BasicRoute"
import BaseLayout from './components/BaseLayout';
import { Toaster } from 'react-hot-toast';

function App() {
  const BasicRoute = useBasicRoute();
  return (
    <BrowserRouter>
      <Toaster position='top-center' />
      <MainLayout>
        <Routes>
          {BasicRoute}
        </Routes>
      </MainLayout>

    </BrowserRouter>
  );
}

export default App;
