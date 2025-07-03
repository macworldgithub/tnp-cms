import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineBarGraph = () => {
  // State to track the screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update the screen width state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine the width based on screen size
  const getWidth = () => {
    if (screenWidth >= 319 && screenWidth <= 375) {
      return 230; // Width for screen size below 768px
    }
    if (screenWidth > 370 && screenWidth <= 425) {
      return 280; // Width for screen size below 768px
    } else if (screenWidth > 425 && screenWidth <= 499) {
      return 380;
    } else if (screenWidth >= 500 && screenWidth <= 750) {
      return 670;
    } else if (screenWidth >= 750 && screenWidth < 768) {
      return 727;
    } else if (screenWidth >= 768 && screenWidth <= 780) {
      return 525; // Width for screen size below 1024px
    } else if (screenWidth >= 781 && screenWidth <= 1024) {
      return 530; // Width for screen size below 1024px
    } else if (screenWidth >= 1030 && screenWidth <= 1205) {
      return 600; // Width for screen size below 1024px
    } else if (screenWidth >= 1206 && screenWidth <= 1400) {
      return 720;
    } else if (screenWidth >= 1400 && screenWidth <= 1440) {
      return 890;
    } else {
      return 1000; // Default width
    }
  };

  const data = [
    { time: "1pm", Hours: 0, Passenger: 20 },
    { time: "2pm", Hours: 20, Passenger: 40 },
    { time: "3pm", Hours: 40, Passenger: 60 },
    { time: "4pm", Hours: 60, Passenger: 80 },
    { time: "5pm", Hours: 20, Passenger: 20 },
    { time: "6pm", Hours: 80, Passenger: 120 },
    { time: "7pm", Hours: 10, Passenger: 80 },
    { time: "8pm", Hours: 140, Passenger: 160 },
    { time: "9pm", Hours: 160, Passenger: 180 },
    { time: "10pm", Hours: 180, Passenger: 200 },
    { time: "11pm", Hours: 200, Passenger: 220 },
    { time: "12pm", Hours: 220, Passenger: 240 },
    { time: "1pm", Hours: 240, Passenger: 260 },
  ];

  return (
    <div className="bg-white w-full rounded-md p-1 ">
      <h2 className="text-xl font-bold mb-4 pl-2">Report</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          width={getWidth()} // Set width based on screen size
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Hours"
            stroke="#00ADEE"
            strokeWidth={4}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Passenger"
            stroke="#FBAD17"
            strokeWidth={4}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineBarGraph;
