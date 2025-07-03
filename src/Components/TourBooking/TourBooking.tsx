import map from "../../../public/map.png"
import Departure from "../Departure/Departure";
import Price from "../Price/Price";
import CabinClass from "../cabinclass/CabinClassButton";
const TourBooking=()=>{
    return(
        <>
        <div className="w-full ">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-4 pl-2 my-4">Tour Booking</h2>
                <img src={map} alt="oo" />
                <h4 className=" font-bold mb-4 pl-2 my-4">Cabin Class</h4>
                <div className="flex md:justify-around  flex-row flex-wrap ">
                   <CabinClass text="All"/>
                   <CabinClass text="Economy"/>
                   <CabinClass text="Buisness"/>
                   <CabinClass text="First Class"/>
                </div>
                <Price/>
                <Departure/>
            
            </div>
        </div>
        </>
    )
}
export default TourBooking;