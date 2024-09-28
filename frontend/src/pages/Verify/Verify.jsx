
import { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            navigate("/"); // Navigate to home on error
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [url, success, orderId]); // Add dependencies to the useEffect

    return (
        <div className='verify'>
            <div className="spinner"></div>
            <p>Verifying your payment...</p> {/* Optional message for user experience */}
        </div>
    );
};

export default Verify;
