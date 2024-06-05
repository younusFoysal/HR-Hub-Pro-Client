import { Helmet } from 'react-helmet-async'
import Banner from "../components/Home/Banner.jsx";
import Services from "../components/Home/Services.jsx";
import Devider from "../components/Home/Devider.jsx";
import Testimonials from "../components/Home/Testimonials.jsx";
import Why from "../components/Home/Why.jsx";


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
        </div>
    )
}

export default Home
