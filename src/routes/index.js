import HomePage from "~/pages/Home";
import Login from "~/pages/Login";
import Tour from "~/pages/Tour";
import AdminLayout from "~/component/Layout/AdminLayout";
import HomeAdmin from "~/pages/HomeAdmin";
import TourAdmin from "~/pages/TourAdmin";
import UserAdmin from "~/pages/UserAdmin";
import Register from "~/pages/Home/Register";
import Contact from "~/pages/Contact";
import DetailTour from "~/pages/DetailTour";
import NewsAdmin from "~/pages/NewsAdmin";
import News from "~/pages/News";
import Booking from "~/pages/Booking";
import PayMothods from "~/pages/Booking/PaymentMethods";
import PaymentSuccess from "~/pages/Booking/PaymentSuccess";
import Profile from "~/pages/Profile";
import ProfileLayout from "~/component/Layout/ProfileLayout";
import Order from "~/pages/Profile/Order";
import OrderAdmin from "~/pages/OrderAdmin";
import DetailNews from "~/pages/DetailNews";
import DetailOrderTour from "~/pages/Profile/Order/detail-tour-oder";
import DetailTourAdmin from "~/pages/TourAdmin/DetailTourAdmin";
import ChangePassword from "~/pages/Profile/ChangePassword";
import DateGoAdmin from "~/pages/DateGoAdmin";
import Faq from "~/pages/FAQ";

// import { useState , useEffect } from "react";
// import { getTour } from "~/GlobalFunction/Api";


// const [products, setProduct] = useState([]);
// useEffect(() => {
//   async function loadTour() {
//     const data = await getTour();
//     setProduct(data);
//   }
//   loadTour();
// }, []);

const publicRoutes = [
    {path: '/' , component:HomePage},
    {path: '/login' , component:Login},
    {path: '/signup' , component:Register},
    {path: '/tour' , component:Tour},
    {path: '/detai_order_tour/:id', component:DetailOrderTour},
    {path: '/contact' , component:Contact},
    {path: '/news' , component:News},
    {path: '/detailnews/:id' , component:DetailNews},
    {path: '/detail/:id' , component:DetailTour},
    {path: '/booking/tourId/:id' , component:Booking},
    {path: '/booking/payment/:idBooking/idTour/:idTour' , component:PayMothods},
    {path: '/booking/payment/success' , component:PaymentSuccess},
    {path: '/profile' , component:Profile , layout:ProfileLayout},
    {path: '/profile/order' , component:Order , layout:ProfileLayout},
    {path: '/profile/changepass' , component:ChangePassword , layout:ProfileLayout},
    {path: '/faq' , component:Faq},
    
]

const privateRoutes =[
    {path: '/admin' , component:HomeAdmin , layout:AdminLayout},
    {path: '/admin/tour' , component:TourAdmin , layout:AdminLayout},
    {path: '/admin/tour/:id' , component:DetailTourAdmin, layout:AdminLayout},
    {path: '/admin/user' , component:UserAdmin , layout:AdminLayout},
    {path: '/admin/news' , component:NewsAdmin , layout:AdminLayout},
    {path: '/admin/order' , component:OrderAdmin , layout:AdminLayout},
    {path: '/admin/datego' , component:DateGoAdmin , layout:AdminLayout},
]

export {publicRoutes,privateRoutes}