import React, { useState } from 'react';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';

const Price: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState([500, 1500]);

  const handleChange = (value: [number, number]) => {
    setSelectedRange(value);
  };

  const marks: SliderSingleProps['marks'] = {
    [selectedRange[0]]: `$${selectedRange[0]}`,
    [selectedRange[1]]: `$${selectedRange[1]}`,
  };

  return (
    <>
      <h4 className='font-bold mb-2 mt-2 pl-2 '>Price</h4>
      <Slider
        range
        marks={marks}
        defaultValue={[500, 1500]}
        min={120}
        max={1800}
        onChange={handleChange}
      />
    </>
  );
};

export default Price;

