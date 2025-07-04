
import { useEffect, useState } from "react";
import { Pagination, Modal, Form, Button, Dropdown, Space, DatePicker,Input } from "antd";
import { DownOutlined, CarOutlined } from "@ant-design/icons";
import axios from "axios";
import { ImCancelCircle } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { RiAddLine } from "react-icons/ri";
import dayjs from "dayjs";
import { Toast } from "../../Components/SideToast";
import Loader from "../../Components/loader";
import TripInsertionBox from "../../Components/TripComp/TripInsertionBox";
interface Package {
  package_id: number;
  package_name: string;
}

const UserPage: React.FC = () => {
  const [openBox, setOpenBox] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [currentPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [form] = Form.useForm();

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  const pageSize = 10;
  const totalItems = data?.length;

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/admin/getTrips?page=${currentPage}&limit=${pageSize}`
      );
      setData(res.data.data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to fetch trips",
      });
    }
    setLoading(false);
  };

  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/admin/getPackagesName`
      );
      setPackages(res.data.data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to fetch packages",
      });
    }
  };

  const DeleteTrip = async (id: number) => {
    setDeleting(true);
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/admin/getTrips?id=${id}`);
      Toast.fire({
        icon: "success",
        title: "Trip Deleted successfully",
      });
      fetchData();
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: err.response.data,
      });
    }
    setDeleting(false);
  };

  const handleEdit = (trip: any) => {
    setSelectedTrip(trip);
    const selectedPkg = packages.find(
      (pkg) => pkg.package_id === trip.trip_package_id
    );
    setSelectedPackage(selectedPkg || null);
    form.setFieldsValue({
      date: trip.trip_date ? dayjs(trip.trip_date) : null,
      bookedCount: trip.trip_booked_count,
      packageId: selectedPkg?.package_id, // Set packageId in form
    });
    setEditBox(true);
  };

  const handleMenuClick = (e: any) => {
    const selectedPkg = packages.find(
      (item) => item.package_id === Number(e.key)
    );
    if (selectedPkg) {
      setSelectedPackage(selectedPkg);
      form.setFieldsValue({ packageId: selectedPkg.package_id });
    }
  };

  const menuItems = packages.map((item) => ({
    label: item.package_name,
    key: item.package_id.toString(),
    icon: <CarOutlined />,
  }));

  const menuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  const handleUpdate = async (values: any) => {
    setEditing(true);
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/admin/getTrips`, {
        tripId: selectedTrip.trip_id,
        packageId: values.packageId,
        date: values.date ? values.date.toISOString() : null,
        bookedCount: values.bookedCount,
      });
      Toast.fire({
        icon: "success",
        title: "Trip updated successfully",
      });
      setEditBox(false);
      fetchData();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to update trip",
      });
    }
    setEditing(false);
  };

  useEffect(() => {
    fetchData();
    fetchPackages();
  }, [currentPage]);

  return (
    <>
      <div className="h-auto overflow-y-auto bg-white w-[95%] relative m-4 rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between m-4">
            <h1 className="sm:text-xl text-lg font-semibold">Trips</h1>
            <Button
              className="bg-[#FBAD17] h-8 w-20 text-white font-semibold flex items-center justify-center"
              icon={<RiAddLine size={23} className="pt-0.5" />}
              onClick={() => setOpenBox(true)}
            >
              Add
            </Button>
            <TripInsertionBox
              BoxState={openBox}
              BoxStateChange={setOpenBox}
              fetchData={fetchData}
            />
          </div>
          <div className="w-full h-[0.8px] bg-gray-300"></div>
        </div>
        <div className="justify-center items-center w-full h-auto">
          <div className="relative overflow-x-auto justify-center items-center">
            <table className="text-md text-left text-gray-500 m-auto lg:w-full md:w-full h-full">
              <thead className="text-xs text-gray-700 uppercase">
                <tr className="border-b border-gray-300">
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    Trip Package Name
                  </td>
                  <td scope="col" className="pl-6 px-4 py-4 text-lg">
                    Total Seats Limit
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Trip Date
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Seats Booked
                  </td>
                  <td scope="col" className="px-4 py-4 text-lg">
                    Actions
                  </td>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => (
                  <tr key={item.trip_id} className="bg-white border-b hover:bg-gray-50">
                    <td
                      scope="row"
                      className="text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg"
                    >
                      <p className="text-lg py-2">{item?.tnp_packages?.package_name}</p>
                    </td>
                    <td
                      scope="row"
                      className="text-gray-900 whitespace-nowrap pl-6 py-2 md:pr-0 pr-4 text-lg"
                    >
                      <p className="text-lg py-2">{item?.tnp_packages?.package_total_persons}</p>
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-lg">
                      {new Date(item?.trip_date)?.toString()}
                    </td>
                    <td className="pl-4 md:pr-0 pr-4 text-lg">
                      {item?.trip_booked_count}
                    </td>
                    <td className="pl-4 py-2 md:pr-0 pr-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)}>
                          <FiEdit className="text-blue-700 hover:text-blue-500 text-2xl" />
                        </button>
                        <button onClick={() => DeleteTrip(item.trip_id)}>
                          <ImCancelCircle className="text-red-700 hover:text-red-500 text-2xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              onChange={handlePageChange}
              pageSize={pageSize}
              total={totalItems}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Edit Trip"
        open={editBox}
        onCancel={() => setEditBox(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="packageId"
            label="Package Name"
            rules={[{ required: true, message: "Please select the package name!" }]}
          >
            <Dropdown menu={menuProps}>
              <Button>
                <Space className="text-black text-lg">
                  {selectedPackage ? selectedPackage.package_name : "Select Package Name"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item
            name="date"
            label="Trip Date"
            rules={[{ required: true, message: "Please select the trip date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="bookedCount"
            label="Booked Count"
            rules={[{ required: true, message: "Please input the booked count!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={editing}
              className="bg-[#FBAD17] w-full"
            >
              Update Trip
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {loading && <Loader message="Fetching Data" />}
      {deleting && <Loader message="Deleting Data" />}
      {editing && <Loader message="Updating Data" />}
    </>
  );
};

export default UserPage;