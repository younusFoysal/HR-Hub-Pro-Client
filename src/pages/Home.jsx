import { Helmet } from 'react-helmet-async'
import Banner from "../components/Home/Banner.jsx";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>HR Hub | Because People Matter</title>
            </Helmet>
           <Banner></Banner>
        </div>
    )
}

export default Home
