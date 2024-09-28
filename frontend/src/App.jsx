import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Cart from "./pages/Cart/Cart"; 
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'; 
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {/* Show login popup based on state */}
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
            <div className='app'>
                <Navbar setShowLogin={setShowLogin} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<PlaceOrder />} />
                    <Route path='/verify' element={<Verify />} />
                    <Route path='/myorders' element={<MyOrders />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

// PropTypes for the App component (define any props if necessary)
App.propTypes = {
    // Example: setShowLogin: PropTypes.func.isRequired,
    // Add more prop types if you expect to pass any props to the App component
};

export default App;
