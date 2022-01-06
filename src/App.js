import logo from './logo.svg';
import './App.css';
// import AuthProvider from './context/AuthProvider';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Header from './containers/Header';
import ProductListing from './containers/ProductListing';
import ProductDetail from './containers/ProductDetail';
import store from './redux/store';
import HomeNavbar from './containers/HomeNavbar/HomeNavbar';
import Login from './containers/Login/Login';
import Registration from './containers/Registration/Registration';
import PrivateRoute from './containers/PrivateRoute/PrivateRoute';
import ProductComponent from './containers/ProductComponent';
import OrderForm from './containers/OrderForm/OrderForm';
import DashBoardHome from './containers/DashBoardHome/DashBoardHome';
import DashBoardMyOrder from './containers/DashBoardMyOrder/DashBoardMyOrder';
import DashBoardProfile from './containers/DashBoardProfile/DashBoardProfile';

function App() {
  return (
        <BrowserRouter>
          {/* <Header/> */}
          {/* <HomeNavbar/> */}
          <Routes>
            <Route path='/' element={<ProductListing/>} />
            <Route path='/home' element={<ProductListing/>} />
            <Route path='/products' element={<div><HomeNavbar/><ProductComponent/></div>} />
            <Route path='/dashboard' element={<DashBoardHome/>}>
                  <Route path=':profile' element={<DashBoardProfile/>}/>
                  <Route path=':my-orders' element={<DashBoardMyOrder label="Dashboard My order"/>}/>
            </Route>
            <Route path="/product/:productId" element={<PrivateRoute><ProductDetail/></PrivateRoute>}/>
            <Route path="/orderForm/:productId" element={<PrivateRoute><OrderForm/></PrivateRoute>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Registration/>} />
            <Route path="*" element={<div><h2>404 Not Found</h2></div>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;


