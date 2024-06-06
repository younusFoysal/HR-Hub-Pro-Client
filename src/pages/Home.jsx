import { Helmet } from 'react-helmet-async'
import Banner from "../components/Home/Banner.jsx";
import Services from "../components/Home/Services.jsx";
import Devider from "../components/Home/Devider.jsx";
import Testimonials from "../components/Home/Testimonials.jsx";
import Why from "../components/Home/Why.jsx";
import CallToAction from "../components/Home/CallToAction.jsx";
import ContactUS from "../components/Home/ContactUS.jsx";
import BackToTop from "../components/Home/BackToTop.jsx";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>HR Hub | Because People Matter</title>
            </Helmet>
           <Banner></Banner>
            <Services></Services>
            <Why></Why>
            <Devider></Devider>
            <Testimonials></Testimonials>
            <CallToAction></CallToAction>
            <ContactUS></ContactUS>
            <BackToTop></BackToTop>
        </div>
    )
}

export default Home
