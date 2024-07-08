"use client";

const ProductLoaderCard = () => {
  return (
    <div className=" bg-[#f5f3ec] p-4 my-10">
      <div className="container mx-auto p-5 rounded-lg bg-white shadow-md">
        <div className="flex flex-col lg:flex-row">
          <div className="mt-5 ">
            <div className="w-[500px] h-[400px] rounded-b-lg rounded-t-lg bg-gray-300 "></div>
          </div>
          <div className="lg: w-1/2 lg:pl-8 p-5 ml-[100px]">
            <div className="text-2xl h-[50px] w-[200px] font-bold rounded-b-lg rounded-t-lg bg-gray-300 "></div>
            <div className="text-gray-500 rounded-b-lg rounded-t-lg bg-gray-300 mt-1 h-[30px] w-full"></div>

            <div className="mt-4">
              <div className="text-xl w-[100px] h-[40px] font-semibold rounded-b-lg rounded-t-lg bg-gray-300"></div>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold  w-28 h-10 rounded-b-lg rounded-t-lg bg-gray-300"></h2>
              <div className="flex space-x-2 mt-2">
                <button className="rounded-b-lg w-10 h-10 rounded-t-lg bg-gray-300"></button>
                <button className="rounded-b-lg w-10 h-10 rounded-t-lg bg-gray-300"></button>
                <button className="rounded-b-lg w-10 h-10 rounded-t-lg bg-gray-300"></button>
              </div>
            </div>
            <button className=" text-black px-4 py-2 h-10 w-full rounded mt-10 font-bold rounded-b-lg rounded-t-lg bg-gray-300"></button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductLoaderCard;
