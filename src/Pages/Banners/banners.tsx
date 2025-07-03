import { useEffect, useState } from "react";
import { Pagination, Upload } from "antd";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { Toast } from "../../Components/SideToast";
import Loader from "../../Components/loader";
import { Button } from "antd";
import { RiAddLine } from "react-icons/ri";
import TripInsertionBox from "../../Components/TripComp/TripInsertionBox";
import { TiUploadOutline } from "react-icons/ti";
import { updateBanner, uploadBanner } from "../../config/firebasemethods";
import { Link } from "react-router-dom";
const Banners: React.FC = () => {
  const [currentPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [data, setData] = useState([]);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };
  const pageSize = 10;
  const totalItems = data?.length;
  const fetchData = async () => {
    setLoading(true);
    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/admin/getBanners?page=${currentPage}&limit=${pageSize}`
    );

    setData(res.data.data);
    setLoading(false);
  };
  const DeleteTrip = async (id: number) => {
    setDeleting(true);
    // await axios
    //   .delete(`${process.env.REACT_APP_SERVER_URL}/admin/getTrips?id=${id}`)
    //   .then((res) => {
    //     Toast.fire({
    //       icon: "success",
    //       title: "Trip Deleted successfully",
    //     });
    //   })
    //   .catch((err) => {
    //     Toast.fire({
    //       icon: "error",
    //       title: err.response.data,
    //     });
    //   });
    setDeleting(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleFileUpload = async (
    event: any,
    fileId: any,
    previousName: any
  ) => {
    // console.log(event);/
    const file = event.target.files[0];

    setDeleting(true);
    let resultUrl = await updateBanner(file, previousName);
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/admin/getBanners`, {
        id: fileId,
        name: file.name,
        url: resultUrl,
      })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Banner Updated successfully",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      });
    console.log("Uploaded file:", resultUrl);
    setDeleting(false);
    fetchData();
  };
  return (
    <>
      <div className="h-auto overflow-y-auto bg-white w-[95x%] relative m-4 rounded-lg  ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between  m-4  ">
            <h1 className="sm:text-xl text-lg font-semibold">Banners</h1>
          </div>
          <div className="w-full h-[0.8px] bg-gray-300"></div>
        </div>

        <div className="justify-center items-center w-full  h-auto">
          <div className="relative overflow-x-auto  justify-center items-center  ">
            <table className="text-md text-left text-gray-500 m-auto lg:w-full md:w-full h-full">
              <thead className="text-xs text-gray-700 uppercase ">
                <tr className="border-b  border-gray-300 ">
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    Page Name
                  </td>
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    Banner Name
                  </td>
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    Bnaner Image
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Change
                  </td>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => (
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                      <p className="text-lg py-2 "> {item?.tnp_banner_page}</p>
                    </td>
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                      <p className="text-lg py-2 "> {item?.tnp_banner_name}</p>
                    </td>
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                      <Link
                        target="_blank"
                        to={item?.tnp_banner_url}
                        className="text-lg py-2 text-blue-800 font-bold hover:text-red-600"
                      >
                        {item?.tnp_banner_url.slice(0, 50) + " ..."}
                      </Link>
                    </td>

                    <td className="  pl-4 py-2 md:pr-0 pr-4">
                      <button onClick={() => DeleteTrip(item.trip_id)}>
                        <input
                          id="file-upload"
                          max={1}
                          accept=".png, .jpeg, .jpg" // Accept both PNG and JPEG files
                          type="file"
                          onChange={(e) =>
                            handleFileUpload(
                              e,
                              item.tnp_banner_id,
                              item.tnp_banner_name
                            )
                          }
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              pageSize={pageSize} // Number of items per page
              total={totalItems} // Total number of items
              showSizeChanger={false} // Hide the size changer
            />
          </div>
        </div>
      </div>
      {loading && <Loader message="Fetching Data" />}
      {deleting && <Loader message="Updating Data" />}
    </>
  );
};
export default Banners;
