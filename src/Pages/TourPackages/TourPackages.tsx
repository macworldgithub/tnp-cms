import { Button, Pagination } from "antd";
import InsertionBox from "../../Components/tourpackages/InsertionBox";
import UpdationBox from "../../Components/tourpackages/UpdationBox";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import Loader from "../../Components/loader";

export default function TourPackages() {
  const [currentPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [data, setData] = useState([]);
  const [openInsertBox, setOpenInsertBox] = useState(false);
  const [openUpdateBox, setOpenUpdateBox] = useState(false);
  const [editPackage, setEditPackage] = useState<any>(null);
  const pageSize = 50;
  const totalItems = data.length;

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/tourpackages/filter?offset=${
          currentPage - 1
        }&limit=${pageSize}`
      );
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (package_id: number) => {
    setDeleting(true);
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/tourpackages`, {
        data: { package_id },
      });
      await fetchData();
    } catch (error) {
      console.error("Error deleting package:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditPackage(item);
    setOpenUpdateBox(true);
  };

  const handlePageChange = (page: number) => {
    setCurrPage(page);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <div className="bg-white rounded-xl h-svh py-4">
        <div className="w-full px-6 flex items-center justify-between border-b py-3 border-gray-300">
          <h2 className="text-lg font-extrabold">Packages</h2>
          <Button
            className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
            icon={<RiAddLine size={23} className="pt-0.5" />}
            onClick={() => {
              setEditPackage(null);
              setOpenInsertBox(true);
            }}
          >
            Add
          </Button>
          <InsertionBox
            BoxState={openInsertBox}
            BoxStateChange={setOpenInsertBox}
            onSuccess={fetchData}
          />
          <UpdationBox
            BoxState={openUpdateBox}
            BoxStateChange={setOpenUpdateBox}
            editPackage={editPackage}
            onSuccess={fetchData}
          />
        </div>
        <div className="justify-center items-center w-full h-auto">
          <div className="relative justify-center items-center">
            <table className="text-md text-left text-gray-500 m-auto md:w-full h-full">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="pl-6 px-4 py-4 text-md font-semibold"
                  >
                    Package Name
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Max Persons
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Duration (Days)
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Package Type
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Destination Name
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Destination Category
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Destination Region
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Deluxe Rate
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Normal Rate
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Is Featured
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Best Seller
                  </th>
                  <th scope="col" className="px-4 py-4 font-bold text-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => (
                  <tr
                    key={item.package_id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td
                      scope="row"
                      className="text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg"
                    >
                      <div className="flex flex-row gap-2">
                        <p className="text-sm py-2">{item?.package_name}</p>
                      </div>
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_description.slice(0, 100) + "..."}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_total_persons}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_duration}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {[1, 2, 3, 4].includes(
                        item.tnp_package_types.package_type_id
                      )
                        ? "Tourism"
                        : item.tnp_package_types.package_type_name}
                    </td>

                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.tnp_destinations.destination_name}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {
                        item.tnp_destinations.tnp_package_categories
                          .package_category_name
                      }
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.tnp_destinations.tnp_package_regions.region_name}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_rate_deluxe}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_rate_normal}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_isfeatured ? "Yes" : "No"}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      {item.package_bestseller ? "Yes" : "No"}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-md">
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(item.package_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              total={totalItems}
              pageSize={pageSize}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
      {loading && <Loader message="Fetching Data" />}
      {deleting && <Loader message="Deleting Data" />}
    </>
  );
}
