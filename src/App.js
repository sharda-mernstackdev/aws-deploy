
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from './component/Footer';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Signup from './component/Signup';
import CarsData from './component/CarsData';
import TestDrive from './component/TestDrive';
import TestDriveStatus from './component/TestDriveStatus';
import Services from './component/Services';
import Financing from './component/Financing';
import Insurance from './component/Insurance';
import AddToCart from './component/AddToCart';
import Showroom from './component/Showroom';
import DealerShip from './component/DealerShip';
import MyAppointment from './component/MyAppointment';
import MyBooking from './component/MyBooking';
import MyOrder from './component/MyOrder';
import ProfileSetting from './component/ProfileSetting';
import CarUpload from './component/CarUpload';
import UsedCars from './component/UsedCars';
import HelpCenter from './component/HelpCenter';
import FAQ from './component/FAQ';
import About from './component/About';
import ContactUs from './component/ContactUs';
import NewCars from './component/NewCars';
import Echallan from './component/Echallan';
import Policy from './component/Policy';
import Testimonial from './component/Testimonial';
import TestDetails from './component/TestDetails';

function App() {
  return (
    <>
     <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>


        <Routes>
          <Route path="/carsdata/:id" element={<CarsData />} />
        </Routes>

        <Routes>
          <Route path="/testdrive/:id" element={<TestDrive />} />
        </Routes>

         <Routes>
          <Route path="/testdriveStatus" element={<TestDriveStatus />} />
        </Routes>

        

        <Routes>
          <Route path="/testDrive-details/:id" element={<TestDetails />} />
        </Routes>

        <Routes>
          <Route path="/service" element={<Services />} />
        </Routes>

        <Routes>
          <Route path="/financing" element={<Financing />} />
        </Routes>

        <Routes>
          <Route path="/insurance" element={<Insurance />} />
        </Routes>

   

        <Routes>
          <Route path="/cart" element={<AddToCart />} />
        </Routes>


        <Routes>
          <Route path="/showrooms" element={<Showroom />} />
        </Routes>

        <Routes>
          <Route path="/dealerships" element={<DealerShip />} />
        </Routes>
]

        <Routes>
          <Route path="/my-appointments" element={<MyAppointment />} />
        </Routes>

        <Routes>
          <Route path="/my-bookings" element={<MyBooking />} />
        </Routes>

        <Routes>
          <Route path="/my-orders" element={<MyOrder />} />
        </Routes>

        <Routes>
          <Route path="/profile" element={<ProfileSetting />} />
        </Routes>

        <Routes>
          <Route path="/carupload" element={<CarUpload />} />
        </Routes>

        <Routes>
          <Route path="/usedcars" element={<UsedCars />} />
        </Routes>

    

        <Routes>
          <Route path="/help" element={<HelpCenter />} />
        </Routes>

        <Routes>
          <Route path="/faq" element={<FAQ />} />
        </Routes>

        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>

        <Routes>
          <Route path="/contact" element={<ContactUs />} />
        </Routes>

        <Routes>
          <Route path="/sell-car" element={<NewCars />} />
        </Routes>

        <Routes>
          <Route path="/new-car" element={<NewCars />} />
        </Routes>

        <Routes>
          <Route path="/challan" element={<Echallan />} />
        </Routes>

        <Routes>
          <Route path="/terms" element={<Policy />} />
        </Routes>

        <Routes>
          <Route path="/testimonials" element={<Testimonial />} />
        </Routes>

        {/* <Routes>
          <Route path="/" element={<UserDetails/>} />
        </Routes> */}


        <ToastContainer />
        <Footer />
      </Router>
    </>
  );
}

export default App;
