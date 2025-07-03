import { Button, Input, Modal, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "axios";
import { useState } from "react";

interface InsertionBoxProps {
  BoxState: boolean;
  BoxStateChange: (value: any) => void;
}



const CarRentalInsertionBox: React.FC<InsertionBoxProps> = ({
  BoxState,
  BoxStateChange,
}) => {
  const [packageName, setPackageName] = useState<string>("");
  const [packageDescription, setPackageDescription] = useState<string>("");
  const [packageCategoryId, setPackageCategoryId] = useState<string>("");
  const [packageTypeId, setPackageTypeId] = useState<string>("");
  const [packageRegionId, setPackageRegionId] = useState<string>("");
  const [packageDuration, setPackageDuration] = useState<string>("");
  const [packageRateNormal, setPackageRateNormal] = useState<string>("");
  const [packageRateDeluxe, setPackageRateDeluxe] = useState<string>("");
  const [packageTotalPersons, setPackageTotalPersons] = useState<string>("");
//   -------------------------------

const [carName, setCarName] = useState<string>("");
const [carRentDate, setCarRentDate] = useState<string>("");
const [clientName, setClientName] = useState<string>("");
const [ratePerDay, setRatePerDay] = useState<string>("");


// ---------------------------------
  const [Itinerary, setItinerary] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [CostIncludes, setCostIncludes] = useState<string[]>([]);
  const [CostExcludes, setCostExcludes] = useState<string[]>([]);
  const [Highlights, setHighlights] = useState<string[]>([]);
  const [tabledataIncludepackages, setTabledataIncludepackages] = useState<string[]>([]);
  const [tabledataCostExcludes, setTabledataCostExcludes] = useState<string[]>([]);
  const [tabledataHighlights, setTabledataHighlights] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleAddPackage = () => {
    setCostIncludes([...CostIncludes, ""]);
  };

  const handleAddCostExclude = () => {
    setCostExcludes([...CostExcludes, ""]);
  };
  const handleAddHighlights = () => {
    setHighlights([...Highlights, ""]);
  };
  const handleDoneHighlights = (index: number) => {
    const newTableData = [...tabledataHighlights];
    newTableData.push(
      Highlights[index]);
      setTabledataHighlights(newTableData);

    const updatedPackages = [...Highlights];
    updatedPackages.splice(index, 1);
    setHighlights(updatedPackages);
  };

  const handleDoneCostExcludes = (index: number) => {
    const newTableData = [...tabledataCostExcludes];
    newTableData.push(
      CostExcludes[index]);
      setTabledataCostExcludes(newTableData);

    const updatedPackages = [...CostExcludes];
    updatedPackages.splice(index, 1);
    setCostExcludes(updatedPackages);
  };


  const handleDeletePackage = (indexToDelete: number) => {
    const updatedTableData = tabledataIncludepackages.filter((item, index) => index !== indexToDelete);
    setTabledataIncludepackages(updatedTableData);
  };

  const handleDeleteCostExcludes = (indexToDelete: number) => {
    const updatedTableData = tabledataCostExcludes.filter((item, index) => index !== indexToDelete);
    setTabledataCostExcludes(updatedTableData);
  };

  const handleDeleteHighlights = (indexToDelete: number) => {
    const updatedTableData = tabledataHighlights.filter((item, index) => index !== indexToDelete);
    setTabledataHighlights(updatedTableData);
  };

  const handleDoneIncludePackages = (index: number) => {
    const newTableData = [...tabledataIncludepackages];
    newTableData.push(
     CostIncludes[index]);
    setTabledataIncludepackages(newTableData);

    const updatedPackages = [...CostIncludes];
    updatedPackages.splice(index, 1);
    setCostIncludes(updatedPackages);
  };

  const handleAddItinerary = () => {
    setItinerary([...Itinerary, { days: "", event: "", description: "" }]);
  };


  const handleDeleteRow = (record: any) => {
    const newTableData = tableData.filter((item) => item !== record);
    setTableData(newTableData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };


  const columns = [
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: 'Event Title',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleDeleteRow(record)} icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];
  const handleDone = (index: number) => {
    const newTableData = [...tableData];
    newTableData.push({
      key: newTableData.length + 1,
      days: Itinerary[index].days,
      event: Itinerary[index].event,
      description: Itinerary[index].description
    });
    setTableData(newTableData);
    // Remove the itinerary from the list
    const updatedItinerary = [...Itinerary];
    updatedItinerary.splice(index, 1);
    setItinerary(updatedItinerary);
  };
  const handleSubmit = async () => {
   
    const newPackage = {

      package_name: packageName,
      package_total_persons: packageTotalPersons,
      package_category_id: packageCategoryId,
      package_type_id: packageTypeId,
      package_region_id: packageRegionId,
      package_description: packageDescription,
      package_rate_normal: packageRateNormal,
      package_rate_deluxe: packageRateDeluxe,
      // package_duration: packageDuration,

      car_name: carName,
      car_rent_date: carRentDate,
      car_client_name: clientName,
      car_rate_per_day: ratePerDay,
      
    //   -------------
      package_details: JSON.stringify({
        TripDetailsAndCostSummary: {
          Itinerary: tableData,
          CostIncludes: tabledataIncludepackages,
          CostExcludes: tabledataCostExcludes,
          Highlights: tabledataHighlights,
          file: selectedFile
        }
      })
    };
console.log(newPackage,"newPackage")
    // Make axios call to add package data to the database
    try {
      const response = await axios.post("/api/packages", newPackage);
      console.log("Package added successfully:", response.data);
      // Clear input fields after successful submission
      setPackageName("");
      setPackageDescription("");
      setPackageCategoryId("");
      setPackageTypeId("");
      setPackageRegionId("");
      setPackageDuration("");
      setPackageRateNormal("");
      setPackageRateDeluxe("");
      setPackageTotalPersons("");

      setCarName("");
      setRatePerDay("");
      setClientName("");
      setCarRentDate("");
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <>
      <Modal
        title="Add Car"
        centered
        visible={BoxState}
        onOk={() => {
          handleSubmit();
          BoxStateChange(false);
        }}
        onCancel={() => BoxStateChange(false)}
        width={1000}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-wrap px-5 gap-2">
            <label className="font-semibold w-44">
              Car Name
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setCarName(e.target.value)}
                value={carName}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Car Rent Date
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setCarRentDate(e.target.value)}
                value={carRentDate}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Client Name
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setClientName(e.target.value)}
                value={clientName}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Rate per Day
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setRatePerDay(e.target.value)}
                value={ratePerDay}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Region
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageRegionId(e.target.value)}
                value={packageRegionId}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Rates Normal
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageRateNormal(e.target.value)}
                value={packageRateNormal}
                required
              />
            </label>
            <label className="font-semibold w-44">
              Package Rates Deluxe
              <Input
                style={{ marginTop: 5 }}
                type="text"
                onChange={(e) => setPackageRateDeluxe(e.target.value)}
                value={packageRateDeluxe}
                required
              />
            </label>
          </div>
          {/* <label className="font-semibold">
            Package Description:
            <Input
              type="text"
              onChange={(e) => setPackageDescription(e.target.value)}
              value={packageDescription}
              required
            />
          </label> */}

          <div>
            <h2 className="text-lg font-semibold">Package Itineraries</h2>
            <Button type="primary" onClick={handleAddItinerary}>
              Add Itinerary
            </Button>
            {Itinerary.map((itinerary, index) => (
              <div className="" key={index}>
                <h2 className="text-lg font-semibold">Package Itinerary {index + 1}</h2>
                <label className="font-semibold flex px-5 flex-col pt-5">
                  Days
                  <Input
                    style={{ width: 144, marginTop: 5 }}
                    type="number"
                    onChange={(e) => {
                      const newItinerary = [...Itinerary];
                      newItinerary[index].days = e.target.value;
                      setItinerary(newItinerary);
                    }}
                    value={itinerary.days}
                    required
                  />
                </label>
                <div className="flex gap-48 px-5 mt-5">
                  <label className="font-semibold w-44">
                    Event Title
                    <Input
                      style={{
                        height: 100,
                        width: 320,
                        marginRight: 10,
                        marginTop: 5,
                      }}
                      type="text"
                      onChange={(e) => {
                        const newItinerary = [...Itinerary];
                        newItinerary[index].event = e.target.value;
                        setItinerary(newItinerary);
                      }}
                      value={itinerary.event}
                      required
                    />
                  </label>
                  <div className=" flex justify-center items-center gap-4">


                    <div className="flex flex-col   ">

                      <label className="font-semibold  w-44">
                        Description
                      </label>
                      <Input
                        style={{ height: 100, width: 320, marginTop: 5 }}
                        type="text"
                        onChange={(e) => {
                          const newItinerary = [...Itinerary];
                          newItinerary[index].description = e.target.value;
                          setItinerary(newItinerary);
                        }}
                        value={itinerary.description}
                        required
                      />
                    </div>
                    <Button className="bg-yellow-400 " onClick={() => handleDone(index)}>Done</Button>
                  </div>

                </div>
              </div>
            ))}


            {tableData.length > 0 && (
              <Table columns={columns} dataSource={tableData} />
            )}
            <div>
              <div>
                <h2 className="text-lg font-semibold">Cost Include </h2>
                <Button type="primary" onClick={handleAddPackage}>
                  Add Cost Include
                </Button>
                {CostIncludes.map((packageItem, index) => (
                  <div key={index} className="px-5 py-2 flex flex-col">
                    <label className="font-semibold">Package {index + 1}</label>
                    <Input
                      style={{ width: "100%", marginTop: 5, marginBottom: 2}}
                      type="text"
                      value={packageItem}
                      onChange={(e) => {
                        const updatedPackages = [...CostIncludes];
                        updatedPackages[index] = e.target.value;
                        setCostIncludes(updatedPackages);
                      }}
                      required
                    />
                    <Button className="bg-yellow-400 w-20 mx-auto" onClick={() => handleDoneIncludePackages(index)}>Done</Button>
                  </div>
                ))}
              </div>
              {tabledataIncludepackages.length > 0 && (
                <Table
                  dataSource={tabledataIncludepackages.map((item) => ({ package: item }))}

                  columns={[
                    {
                      title: "Package",
                      dataIndex: "package",
                      key: "package"
                    },
                    {
                      title: "Action",
                      dataIndex: "",
                      key: "action",
                      render: (_text: any, record: any, index: number) => (
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeletePackage(index)}
                        />
                      )
                    }
                  ]}
                />
              )}

              <div>
                <h2 className="text-lg font-semibold mt-5">Cost Exclude</h2>
                <Button type="primary" onClick={handleAddCostExclude}>
                  Add Cost Exclude 
                </Button>
                {CostExcludes.map((packageItem, index) => (
                  <div key={index} className="px-5 py-2 flex flex-col">
                    <label className="font-semibold">Package {index + 1}</label>
                    <Input
                      style={{ width: "100%", marginTop: 5, marginBottom: 2}}
                      type="text"
                      value={packageItem}
                      onChange={(e) => {
                        const updatedCost = [...CostExcludes];
                        updatedCost[index] = e.target.value;
                        setCostExcludes(updatedCost);
                      }}
                      required
                    />
                    <Button className="bg-yellow-400 w-20 mx-auto" onClick={() => handleDoneCostExcludes(index)}>Done</Button>
                  </div>
                ))}
              </div>
              {tabledataCostExcludes.length > 0 && (
                <Table
                  dataSource={tabledataCostExcludes.map((item) => ({ package: item }))}

                  columns={[
                    {
                      title: "Cost Exclude",
                      dataIndex: "package",
                      key: "package"
                    },
                    {
                      title: "Action",
                      dataIndex: "",
                      key: "action",
                      render: (_text: any, record: any, index: number) => (
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteCostExcludes(index)}
                        />
                      )
                    }
                  ]}
                />
              )}
              


              <div>
                <h2 className="text-lg font-semibold mt-5">Highlights</h2>
                <Button type="primary" onClick={handleAddHighlights}>
                  Add Highlights 
                </Button>
                {Highlights.map((packageItem, index) => (
                  <div key={index} className="px-5 py-2 flex flex-col">
                    <label className="font-semibold">Package {index + 1}</label>
                    <Input
                      style={{ width: "100%", marginTop: 5, marginBottom: 2}}
                      type="text"
                      value={packageItem}
                      onChange={(e) => {
                        const updatedHighlight = [...Highlights];
                        updatedHighlight[index] = e.target.value;
                        setHighlights(updatedHighlight);
                      }}
                      required
                    />
                    <Button className="bg-yellow-400 w-20 mx-auto" onClick={() => handleDoneHighlights(index)}>Done</Button>
                  </div>
                ))}
              </div>
              {tabledataHighlights.length > 0 && (
                <Table
                  dataSource={tabledataHighlights.map((item) => ({ package: item }))}

                  columns={[
                    {
                      title: "Highlights",
                      dataIndex: "package",
                      key: "package"
                    },
                    {
                      title: "Action",
                      dataIndex: "",
                      key: "action",
                      render: (_text: any, record: any, index: number) => (
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteHighlights(index)}
                        />
                      )
                    }
                  ]}
                />
              )}

<div>
                <h2 className="text-lg font-semibold mt-5">Car Images</h2>
                <label className="font-semibold px-5">
                <Input
  style={{ width: 240, padding: "25px 10px", marginTop: 10 }}
  type="file"
  onChange={handleFileChange}
  required
/>
                </label>
              </div>

            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CarRentalInsertionBox;
