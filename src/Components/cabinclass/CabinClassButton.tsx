import React, { useState } from 'react';

const CabinClass = ({ text }: { text: string }) => {
    // State to track whether the button is clicked or not
    const [clicked, setClicked] = useState(false);

    // Function to handle click event
    const handleClick = () => {
        setClicked(!clicked); // Toggle the clicked state
    };

    return (
        <button
            className={`p-2 border border-gray-300 rounded-md my-1 md:my-0  text-black w-fit ${clicked ? 'bg-sky-500 text-white' : 'bg-white'}`}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default CabinClass;
