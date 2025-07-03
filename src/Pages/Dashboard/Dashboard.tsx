import LastTrips from "../../Components/LastTrips/LastTrips";
import TourBooking from "../../Components/TourBooking/TourBooking";
import BoxComponent from "../../Components/box/Box";
import LineBarGraph from "../../Components/graph/graph";
import GradientProgressBar from "../../Components/progress/progress";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="  flex flex-col lg:flex-row justify-between items-center lg:items-start ">
        <BoxComponent heading="Total Booked" value="24.590" tagText="+12.08%" />
        <BoxComponent
          heading="30 days Revenue"
          value="24.590 PKR"
          tagText="+12.08%"
        />
        <BoxComponent
          heading="Total Customers"
          value="24.590"
          tagText="+12.08%"
        />
        <BoxComponent
          heading="Tour Packages"
          value="24.590 PKR"
          tagText="+12.08%"
        />
      </div>
      <div className="flex flex-col lg:flex-row  gap-2 justify-between">
        <div className="lg:w-[70%]  w-full items-center lg:items-start flex">
          <LineBarGraph />
        </div>
        <div className="lg:w-[30%]  w-full  bg-white p-2  rounded-md ">
          <h2 className="text-xl font-bold mb-4 pl-2">Tours</h2>
          <div className="items-center lg:items-start flex justify-center">
            <GradientProgressBar text="4078" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row  gap-2 justify-between">
        <div className="lg:w-[30%]  w-full  bg-white p-2  rounded ">
          <TourBooking />
        </div>
        <div className="lg:w-[70%]  w-full">
          <LastTrips />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
