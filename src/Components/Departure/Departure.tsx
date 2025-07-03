import { Button } from "antd";

const TimeSlots = [{starttime:"10:00am" , endtime:"11:00am"},{starttime:"11:00am" , endtime:"12:00pm"},{starttime:"12:00pm" , endtime:"1:00pm"},{starttime:"1:00pm" , endtime:"2:00pm"},{starttime:"2:00pm" , endtime:"3:00pm"},{starttime:"3:00pm" , endtime:"4:00pm"},{starttime:"4:00pm" , endtime:"5:00pm"},{starttime:"5:00pm" , endtime:"6:00pm"},{starttime:"6:00pm" , endtime:"7:00pm"},{starttime:"7:00pm" , endtime:"8:00pm"},{starttime:"8:00pm" , endtime:"9:00pm"},{starttime:"9:00pm" , endtime:"10:00pm"},{starttime:"10:00pm" , endtime:"11:00pm"},{starttime:"11:00pm" , endtime:"12:00am"}
];
const Departure: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="font-bold mb-1 pl-2 ">Departure</h2>
      <div className="flex flex-row gap-2 w-full overflow-x-auto">
        {TimeSlots.map((item, index)=>(
            <Button className="flex flex-row bg-sky-500 text-white">{item?.starttime}-{item?.endtime}</Button>
        ))}
      </div>
    </div>
  );
};
export default Departure;
