import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';

interface GradientProgressBarProps {
  text: string;
}

const GradientProgressBar: React.FC<GradientProgressBarProps> = ({ text }) => {
  // State to track the screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update the screen width state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine the width based on screen size
  const getWidth = () => {

    if (screenWidth >= 445 && screenWidth <= 1024) {
      return 225; 
    } 
    else  if (screenWidth >= 300 && screenWidth < 445) {
        return 190; 
      }
      else  if (screenWidth >= 200 && screenWidth < 300) {
        return 170; 
      }else {
      return 250; 
    }
  };

  return (
    <div className='mt-3 ' style={{ position: 'relative', marginBottom: '1rem' }}>
      <Progress
        type='circle'
        width={getWidth()} 
        strokeWidth={20} 
        strokeColor={{
          '0%': '#FFC107', 
          '50%': '#2196F3', 
          '100%': '#E91E63', 
        }}
        percent={100}
        format={() => null} 
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black text-2xl font-bold ">
        <div>{text}</div>
        <div>No of Tours</div>
      </div>
    </div>
  );
};

export default GradientProgressBar;
