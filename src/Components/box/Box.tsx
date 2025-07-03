import React from 'react';

interface Props {
  heading: string;
  value: string;
  tagText: string;
}

const BoxComponent: React.FC<Props> = ({ heading, value, tagText }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md  lg:w-[24%] w-[100%] md:w-[60%] my-2 lg:my-1 h-[175px]">
      <h2 className="text-gray-300 text-lg font-bold mb-4">{heading}</h2>
      <div className="text-black font-bold text-2xl mb-4">
        <p>{value}</p>
      </div>
      <div className="bg-blue-100 text-blue-600 rounded w-fit px-3">{tagText}</div>
    </div>
  );
};

export default BoxComponent;
