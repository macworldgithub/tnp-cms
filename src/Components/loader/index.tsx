const Loader = ({ message }: { message: string }) => {
  return (
    <div className="absolute w-screen h-screen  z-60">
      <div className="backdrop-blur-sm text-green-700 font-bold text-xl h-full w-full flex justify-center items-center">
        {message} ...
      </div>
    </div>
  );
};

export default Loader;
