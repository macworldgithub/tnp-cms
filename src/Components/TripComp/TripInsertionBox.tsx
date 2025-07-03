import axios from "axios";
import { useState, useEffect } from "react";
import { DownOutlined, CarOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Modal, DatePicker } from "antd";
import { Toast } from "../SideToast";

interface Package {
  package_id: number;
  package_name: string;
}

interface InsertionBoxProps {
  BoxState: boolean;
  BoxStateChange: (value: any) => void;
  fetchData: () => void;
}

const TripInsertionBox: React.FC<InsertionBoxProps> = ({
  BoxState,
  BoxStateChange,
  fetchData,
}) => {
  const [data, setData] = useState<Package[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<Package | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/admin/getPackagesName`
        );
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onOk = (value: any) => {
    console.log("onOk: ", value);
    setDate(value);
  };

  const handleMenuClick = (e: any) => {
    const selectedPackage = data.find(
      (item) => item.package_id === Number(e.key)
    );
    if (selectedPackage) {
      setSelectedTrip(selectedPackage);
      message.info(`Selected trip: ${selectedPackage.package_name}`);
    } else {
      console.error("Selected package not found.");
    }
  };

  const menuItems = data.map((item) => ({
    label: item.package_name,
    key: item.package_id.toString(),
    icon: <CarOutlined />,
  }));

  const menuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

  const handleSubmit = async () => {
    console.log("submission trip", selectedTrip);
    console.log("submission date", date);
    if (!selectedTrip || !date) {
      console.error("Please select a trip and date.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/getTrips`,
        {
          packageId: selectedTrip.package_id,
          date: date,
        }
      );
      Toast.fire({
        icon: "success",
        title: "Trip Added successfully",
      });

      console.log("Submission response:", response.data);
      BoxStateChange(false);
      fetchData();
    } catch (error) {
      console.error("Error submitting trip:", error);
    }
  };

  return (
    <Modal
      title="Add Trip"
      centered
      visible={BoxState}
      width={700}
      onOk={handleSubmit}
      onCancel={() => BoxStateChange(false)}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-wrap px-5 gap-2">
          {/* ----DROPDOWN------ */}
          <Dropdown menu={menuProps} className="px-5 ">
            <Button>
              <Space className="text-black text-lg">
                {selectedTrip ? selectedTrip.package_name : "Select Trip Name"}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          {/* ------DATEPICKER-------- */}
          <DatePicker
            showTime
            onChange={(value, dateString) => {
              console.log("Selected Time: ", value);
              console.log("Formatted Selected Time: ", dateString);
            }}
            onOk={onOk}
          />
        </div>
      </form>
    </Modal>
  );
};

export default TripInsertionBox;
