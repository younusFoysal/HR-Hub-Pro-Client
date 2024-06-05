import { Helmet } from 'react-helmet-async'
import Banner from "../components/Home/Banner.jsx";
import Services from "../components/Home/Services.jsx";
import Devider from "../components/Home/Devider.jsx";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>HR Hub | Because People Matter</title>
            </Helmet>
           <Banner></Banner>
            <Services></Services>
            <Devider></Devider>
        </div>
    )
}

export default Home
