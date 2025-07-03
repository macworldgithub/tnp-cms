import { useEffect, useState } from "react";
import { Pagination } from "antd";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { Toast } from "../../Components/SideToast";
import Loader from "../../Components/loader";
const UserPage: React.FC = () => {
  const [currentPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };
  const [data, setData] = useState([]);
  const pageSize = 10;
  const totalItems = data?.length;
  const fetchData = async () => {
    setLoading(true);

    let res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/admin/getUsers?page=${currentPage}&limit=${pageSize}`
    );
    setData(res.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const DeleteUser = async (id: number) => {
    setDeleting(true);
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/admin/getUsers?id=${id}`)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "User Deleted successfully",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      });
    setDeleting(false);

    fetchData();
  };
  return (
    <>
      <div className="h-auto overflow-y-auto bg-white w-[95x%] relative m-4 rounded-lg  ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between  m-4  ">
            <h1 className="sm:text-xl text-lg font-semibold">Users</h1>
          </div>
          <div className="w-full h-[0.8px] bg-gray-300"></div>
        </div>
        <div className="justify-center items-center w-full  h-auto">
          <div className="relative overflow-x-auto  justify-center items-center  ">
            <table className="text-md text-left text-gray-500 m-auto lg:w-full md:w-full h-full">
              <thead className="text-xs text-gray-700 uppercase ">
                <tr className="border-b  border-gray-300 ">
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    First Name
                  </td>
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    Last Name
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Email
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Login Count
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Remove
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
                      <p className="text-lg py-2 "> {item?.name}</p>
                    </td>
                    <td
                      scope="row"
                      className=" text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg "
                    >
                      <p className="text-lg py-2 "> {item?.lname}</p>
                    </td>

                    <td className="  pl-4 md:pr-0 pr-4 text-lg">
                      {item.email}
                    </td>
                    <td className="  pl-4 md:pr-0 pr-4 text-lg">
                      {item.login_count}
                    </td>

                    {/* <td
                    className={` pl-4  py-2 md:pr-0 pr-4 text-lg ${
                      item.status == "active"
                        ? "text-green-500"
                        : "text-orange-400"
                    }`}
                  >
                    {item?.status == "active" ? "Active" : "Not Active"}
                  </td> */}

                    <td className="  pl-4 py-2 md:pr-0 pr-4">
                      <button onClick={() => DeleteUser(item.id)}>
                        <ImCancelCircle className="text-red-700 hover:text-red-500 text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* <tr colSpan={7} className="">
                  <td colSpan={7} className="flex flex-row gap-2">
                    {currentPage > 1 && (
                      <GrLinkPrevious
                        classNameName="mt-1 text-orange-500"
                        onClick={handlePreviousPage}
                      />
                    )}
                    {isMoreUsersAvailable ? (
                      <button
                        classNameName="text-center text-orange-500 w-full"
                        onClick={handleReadMore}
                      >
                        Read More
                      </button>
                    ) : (
                      <p className="text-center text-orange-500">
                        No More Users
                      </p>
                    )}
                  </td>
                </tr> */}
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              total={totalItems} // Total number of items
              pageSize={pageSize} // Number of items per page
              showSizeChanger={false} // Hide the size changer
            />
          </div>
        </div>
      </div>
      {loading && <Loader message="Fetching Data" />}
      {deleting && <Loader message="Deleting Data" />}
    </>
  );
};
export default UserPage;
