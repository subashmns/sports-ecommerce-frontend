
import NavBar from "../../Components/common/navBar"
import FetchCustomerApi from "../../Components/customer/FetchCustomerApi";
import BannerCarousel from "../../Components/customer/banner/BannerCarousel";

const HomePage = () => {
    
    return(
        <>
        <NavBar/>
        <BannerCarousel/>
        <FetchCustomerApi className ='container-fluid' />
        </>
    )
}

export default HomePage;