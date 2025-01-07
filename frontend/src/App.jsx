import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import useBasicRoute from "./routes/BasicRoute";
import MainLayout from './components/MainLayout';
import BaseLayout from '../../client/src/components/BaseLayout';
// import BankSetup from './setup/school/bankSetup/page';
// import BaseLayout from './components/BaseLayout';
// import Navbar from './components/Navbar';


function App() {
  // const BasicRoute= useBasicRoute()

  return (
    <div className='root' id='root'>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<div>heelo</div>} />
            <Route path="/setup/school/bankSetup" element={<BaseLayout ><div>heelooo</div></BaseLayout> } />
            {/* {BasicRoute} */}
          </Routes>
        </MainLayout>
      </Router>
    </div>
  )
}

export default App
