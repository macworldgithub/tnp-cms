
// import { Button, Input, Modal, Space, Table } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { useState } from "react";

// interface InsertionBoxProps {
//   BoxState: boolean;
//   BoxStateChange: (value: boolean) => void;
//   onSuccess: () => void;
// }

// const InsertionBox: React.FC<InsertionBoxProps> = ({
//   BoxState,
//   BoxStateChange,
//   onSuccess,
// }) => {
//   const [packageName, setPackageName] = useState<string>("");
//   const [packageDescription, setPackageDescription] = useState<string>("");
//   const [packageCategoryId, setPackageCategoryId] = useState<string>("");
//   const [packageTypeId, setPackageTypeId] = useState<string>("");
//   const [packageRegionId, setPackageRegionId] = useState<string>("");
//   const [packageDuration, setPackageDuration] = useState<string>("");
//   const [packageRateNormal, setPackageRateNormal] = useState<string>("");
//   const [packageRateDeluxe, setPackageRateDeluxe] = useState<string>("");
//   const [packageTotalPersons, setPackageTotalPersons] = useState<string>("");
//   const [itinerary, setItinerary] = useState<any[]>([]);
//   const [tableData, setTableData] = useState<any[]>([]);
//   const [costIncludes, setCostIncludes] = useState<string[]>([]);
//   const [costExcludes, setCostExcludes] = useState<string[]>([]);
//   const [highlights, setHighlights] = useState<string[]>([]);
//   const [tabledataIncludepackages, setTabledataIncludepackages] = useState<string[]>([]);
//   const [tabledataCostExcludes, setTabledataCostExcludes] = useState<string[]>([]);
//   const [tabledataHighlights, setTabledataHighlights] = useState<string[]>([]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleAddPackage = () => {
//     setCostIncludes([...costIncludes, ""]);
//   };

//   const handleAddCostExclude = () => {
//     setCostExcludes([...costExcludes, ""]);
//   };

//   const handleAddHighlights = () => {
//     setHighlights([...highlights, ""]);
//   };

//   const handleDoneHighlights = (index: number) => {
//     const newTableData = [...tabledataHighlights];
//     newTableData.push(highlights[index]);
//     setTabledataHighlights(newTableData);

//     const updatedPackages = [...highlights];
//     updatedPackages.splice(index, 1);
//     setHighlights(updatedPackages);
//   };

//   const handleDoneCostExcludes = (index: number) => {
//     const newTableData = [...tabledataCostExcludes];
//     newTableData.push(costExcludes[index]);
//     setTabledataCostExcludes(newTableData);

//     const updatedPackages = [...costExcludes];
//     updatedPackages.splice(index, 1);
//     setCostExcludes(updatedPackages);
//   };

//   const handleDeletePackage = (indexToDelete: number) => {
//     const updatedTableData = tabledataIncludepackages.filter((item, index) => index !== indexToDelete);
//     setTabledataIncludepackages(updatedTableData);
//   };

//   const handleDeleteCostExcludes = (indexToDelete: number) => {
//     const updatedTableData = tabledataCostExcludes.filter((item, index) => index !== indexToDelete);
//     setTabledataCostExcludes(updatedTableData);
//   };

//   const handleDeleteHighlights = (indexToDelete: number) => {
//     const updatedTableData = tabledataHighlights.filter((item, index) => index !== indexToDelete);
//     setTabledataHighlights(updatedTableData);
//   };

//   const handleDoneIncludePackages = (index: number) => {
//     const newTableData = [...tabledataIncludepackages];
//     newTableData.push(costIncludes[index]);
//     setTabledataIncludepackages(newTableData);

//     const updatedPackages = [...costIncludes];
//     updatedPackages.splice(index, 1);
//     setCostIncludes(updatedPackages);
//   };

//   const handleAddItinerary = () => {
//     setItinerary([...itinerary, { days: "", event: "", description: "" }]);
//   };

//   const handleDeleteRow = (record: any) => {
//     const newTableData = tableData.filter((item) => item !== record);
//     setTableData(newTableData);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const columns = [
//     {
//       title: "Days",
//       dataIndex: "days",
//       key: "days",
//     },
//     {
//       title: "Event Title",
//       dataIndex: "event",
//       key: "event",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text: any, record: any) => (
//         <Space size="middle">
//           <Button type="link" onClick={() => handleDeleteRow(record)} icon={<DeleteOutlined />} />
//         </Space>
//       ),
//     },
//   ];

//   const handleDone = (index: number) => {
//     const newTableData = [...tableData];
//     newTableData.push({
//       key: newTableData.length + 1,
//       days: itinerary[index].days,
//       event: itinerary[index].event,
//       description: itinerary[index].description,
//     });
//     setTableData(newTableData);
//     const updatedItinerary = [...itinerary];
//     updatedItinerary.splice(index, 1);
//     setItinerary(updatedItinerary);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("package_name", packageName);
//     formData.append("package_total_persons", packageTotalPersons);
//     formData.append("package_category_id", packageCategoryId);
//     formData.append("package_type_id", packageTypeId);
//     formData.append("package_region_id", packageRegionId);
//     formData.append("package_description", packageDescription);
//     formData.append("package_rate_normal", packageRateNormal);
//     formData.append("package_rate_deluxe", packageRateDeluxe);
//     formData.append("package_destination_id", packageCategoryId);
//     formData.append("package_duration", packageDuration);
//     formData.append(
//       "package_details",
//       JSON.stringify({
//         TripDetailsAndCostSummary: {
//           Itinerary: tableData,
//           CostIncludes: tabledataIncludepackages,
//           CostExcludes: tabledataCostExcludes,
//           Highlights: tabledataHighlights,
//         },
//       })
//     );
//     if (selectedFile) {
//       formData.append("file", selectedFile);
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_SERVER_URL}/tourpackages`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Package added successfully:", response.data);
//       setPackageName("");
//       setPackageDescription("");
//       setPackageCategoryId("");
//       setPackageTypeId("");
//       setPackageRegionId("");
//       setPackageDuration("");
//       setPackageRateNormal("");
//       setPackageRateDeluxe("");
//       setPackageTotalPersons("");
//       setTableData([]);
//       setTabledataIncludepackages([]);
//       setTabledataCostExcludes([]);
//       setTabledataHighlights([]);
//       setSelectedFile(null);
//       onSuccess();
//       BoxStateChange(false);
//     } catch (error) {
//       console.error("Error adding package:", error);
//     }
//   };

//   return (
//     <Modal
//       title="Add Package"
//       centered
//       open={BoxState}
//       onOk={() => {
//         handleSubmit();
//         BoxStateChange(false);
//       }}
//       onCancel={() => BoxStateChange(false)}
//       width={1000}
//     >
//       <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-5">
//         <div className="flex flex-wrap px-5 gap-2">
//           <label className="font-semibold w-44">
//             Package Name
//             <Input
//               style={{ marginTop: 5 }}
//               type="text"
//               onChange={(e) => setPackageName(e.target.value)}
//               value={packageName}
//               required
//             />
//           </label>
//           <label className="font-semibold w-44">
//             Package Persons
//             <Input
//               style={{ marginTop: 5 }}
//               type="text"
//               onChange={(e) => setPackageTotalPersons(e.target.value)}
//               value={packageTotalPersons}
//               required
//             />
//           </label>
//           <label className="font-semibold w-44">
//             Package Category
//             <Input
//               style={{ marginTop: 5 }}
//               type="text"
//               onChange={(e) => setPackageCategoryId(e.target.value)}
//               value={packageCategoryId}
//               required
//             />
//           </label>
//           <label className="font-semibold w-44">
//             Package Type
//             <Input
//               style={{ marginTop: 5 }}
//               type="text"
//               onChange={(e) => setPackageTypeId(e.target.value)}
//               value={packageTypeId}
//               required
//             />
//           </label>
//           <label className="font-semibold w-44">
//             Package Region
//             <Input
//               style={{ marginTop: 5 }}
//               type="text"
//               onChange={(e) => setPackageRegionId(e.target.value)}
//               value={packageRegionId}
//               required
//             />
//           </label>
//           <label className="font-semibold w-44">
//             Package Rates Normal
//             <Input
//               style={{ marginTop: 5 }}
//               type="text"
//               onChange={(e) => setPackageRateNormal(e.target.value)}
//               value={packageRateNormal}
//               required
//             />
//           </label>
//           <label className="font-semibold w-44">
//             Package Rates Deluxe
//             <Input
//               style={{ marginTop: 5 }}
//               type="text"
//               onChange={(e) => setPackageRateDeluxe(e.target.value)}
//               value={packageRateDeluxe}
//               required
//             />
//           </label>
//           <label className="font-semibold w-44">
//             Package Duration
//             <Input
//               style={{ marginTop: 5 }}
//               type="text"
//               onChange={(e) => setPackageDuration(e.target.value)}
//               value={packageDuration}
//               required
//             />
//           </label>
//         </div>

//         <div>
//           <h2 className="text-lg font-semibold">Package Itineraries</h2>
//           <Button type="primary" onClick={handleAddItinerary}>
//             Add Itinerary
//           </Button>
//           {itinerary.map((itineraryItem, index) => (
//             <div key={index}>
//               <h2 className="text-lg font-semibold">Package Itinerary {index + 1}</h2>
//               <label className="font-semibold flex px-5 flex-col pt-5">
//                 Days
//                 <Input
//                   style={{ width: 144, marginTop: 5 }}
//                   type="number"
//                   onChange={(e) => {
//                     const newItinerary = [...itinerary];
//                     newItinerary[index].days = e.target.value;
//                     setItinerary(newItinerary);
//                   }}
//                   value={itineraryItem.days}
//                   required
//                 />
//               </label>
//               <div className="flex gap-48 px-5 mt-5">
//                 <label className="font-semibold w-44">
//                   Event Title
//                   <Input
//                     style={{ height: 100, width: 320, marginRight: 10, marginTop: 5 }}
//                     type="text"
//                     onChange={(e) => {
//                       const newItinerary = [...itinerary];
//                       newItinerary[index].event = e.target.value;
//                       setItinerary(newItinerary);
//                     }}
//                     value={itineraryItem.event}
//                     required
//                   />
//                 </label>
//                 <div className="flex justify-center items-center gap-4">
//                   <div className="flex flex-col">
//                     <label className="font-semibold w-44">
//                       Description
//                     </label>
//                     <Input
//                       style={{ height: 100, width: 320, marginTop: 5 }}
//                       type="text"
//                       onChange={(e) => {
//                         const newItinerary = [...itinerary];
//                         newItinerary[index].description = e.target.value;
//                         setItinerary(newItinerary);
//                       }}
//                       value={itineraryItem.description}
//                       required
//                     />
//                   </div>
//                   <Button className="bg-yellow-400" onClick={() => handleDone(index)}>
//                     Done
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {tableData.length > 0 && <Table columns={columns} dataSource={tableData} />}

//           <div>
//             <h2 className="text-lg font-semibold">Cost Include</h2>
//             <Button type="primary" onClick={handleAddPackage}>
//               Add Cost Include
//             </Button>
//             {costIncludes.map((packageItem, index) => (
//               <div key={index} className="px-5 py-2 flex flex-col">
//                 <label className="font-semibold">Package {index + 1}</label>
//                 <Input
//                   style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
//                   type="text"
//                   value={packageItem}
//                   onChange={(e) => {
//                     const updatedPackages = [...costIncludes];
//                     updatedPackages[index] = e.target.value;
//                     setCostIncludes(updatedPackages);
//                   }}
//                   required
//                 />
//                 <Button
//                   className="bg-yellow-400 w-20 mx-auto"
//                   onClick={() => handleDoneIncludePackages(index)}
//                 >
//                   Done
//                 </Button>
//               </div>
//             ))}
//           </div>
//           {tabledataIncludepackages.length > 0 && (
//             <Table
//               dataSource={tabledataIncludepackages.map((item) => ({ package: item }))}
//               columns={[
//                 { title: "Package", dataIndex: "package", key: "package" },
//                 {
//                   title: "Action",
//                   dataIndex: "",
//                   key: "action",
//                   render: (_text: any, _record: any, index: number) => (
//                     <Button
//                       type="link"
//                       danger
//                       icon={<DeleteOutlined />}
//                       onClick={() => handleDeletePackage(index)}
//                     />
//                   ),
//                 },
//               ]}
//             />
//           )}

//           <div>
//             <h2 className="text-lg font-semibold mt-5">Cost Exclude</h2>
//             <Button type="primary" onClick={handleAddCostExclude}>
//               Add Cost Exclude
//             </Button>
//             {costExcludes.map((packageItem, index) => (
//               <div key={index} className="px-5 py-2 flex flex-col">
//                 <label className="font-semibold">Package {index + 1}</label>
//                 <Input
//                   style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
//                   type="text"
//                   value={packageItem}
//                   onChange={(e) => {
//                     const updatedCost = [...costExcludes];
//                     updatedCost[index] = e.target.value;
//                     setCostExcludes(updatedCost);
//                   }}
//                   required
//                 />
//                 <Button
//                   className="bg-yellow-400 w-20 mx-auto"
//                   onClick={() => handleDoneCostExcludes(index)}
//                 >
//                   Done
//                 </Button>
//               </div>
//             ))}
//           </div>
//           {tabledataCostExcludes.length > 0 && (
//             <Table
//               dataSource={tabledataCostExcludes.map((item) => ({ package: item }))}
//               columns={[
//                 { title: "Cost Exclude", dataIndex: "package", key: "package" },
//                 {
//                   title: "Action",
//                   dataIndex: "",
//                   key: "action",
//                   render: (_text: any, _record: any, index: number) => (
//                     <Button
//                       type="link"
//                       danger
//                       icon={<DeleteOutlined />}
//                       onClick={() => handleDeleteCostExcludes(index)}
//                     />
//                   ),
//                 },
//               ]}
//             />
//           )}

//           <div>
//             <h2 className="text-lg font-semibold mt-5">Highlights</h2>
//             <Button type="primary" onClick={handleAddHighlights}>
//               Add Highlights
//             </Button>
//             {highlights.map((packageItem, index) => (
//               <div key={index} className="px-5 py-2 flex flex-col">
//                 <label className="font-semibold">Package {index + 1}</label>
//                 <Input
//                   style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
//                   type="text"
//                   value={packageItem}
//                   onChange={(e) => {
//                     const updatedHighlight = [...highlights];
//                     updatedHighlight[index] = e.target.value;
//                     setHighlights(updatedHighlight);
//                   }}
//                   required
//                 />
//                 <Button
//                   className="bg-yellow-400 w-20 mx-auto"
//                   onClick={() => handleDoneHighlights(index)}
//                 >
//                   Done
//                 </Button>
//               </div>
//             ))}
//           </div>
//           {tabledataHighlights.length > 0 && (
//             <Table
//               dataSource={tabledataHighlights.map((item) => ({ package: item }))}
//               columns={[
//                 { title: "Highlights", dataIndex: "package", key: "package" },
//                 {
//                   title: "Action",
//                   dataIndex: "",
//                   key: "action",
//                   render: (_text: any, _record: any, index: number) => (
//                     <Button
//                       type="link"
//                       danger
//                       icon={<DeleteOutlined />}
//                       onClick={() => handleDeleteHighlights(index)}
//                     />
//                   ),
//                 },
//               ]}
//             />
//           )}

//           <div>
//             <h2 className="text-lg font-semibold mt-5">Package Images</h2>
//             <label className="font-semibold px-5">
//               <Input
//                 style={{ width: 240, padding: "25px 10px", marginTop: 10 }}
//                 type="file"
//                 onChange={handleFileChange}
//                 required
//               />
//             </label>
//           </div>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default InsertionBox;
import { Button, Input, Modal, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

interface InsertionBoxProps {
  BoxState: boolean;
  BoxStateChange: (value: boolean) => void;
  onSuccess: () => void;
}

const InsertionBox: React.FC<InsertionBoxProps> = ({
  BoxState,
  BoxStateChange,
  onSuccess,
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
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [costIncludes, setCostIncludes] = useState<string[]>([]);
  const [costExcludes, setCostExcludes] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [tabledataIncludepackages, setTabledataIncludepackages] = useState<string[]>([]);
  const [tabledataCostExcludes, setTabledataCostExcludes] = useState<string[]>([]);
  const [tabledataHighlights, setTabledataHighlights] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleAddPackage = () => {
    setCostIncludes([...costIncludes, ""]);
  };

  const handleAddCostExclude = () => {
    setCostExcludes([...costExcludes, ""]);
  };

  const handleAddHighlights = () => {
    setHighlights([...highlights, ""]);
  };

  const handleDoneHighlights = (index: number) => {
    const newTableData = [...tabledataHighlights];
    newTableData.push(highlights[index]);
    setTabledataHighlights(newTableData);

    const updatedPackages = [...highlights];
    updatedPackages.splice(index, 1);
    setHighlights(updatedPackages);
  };

  const handleDoneCostExcludes = (index: number) => {
    const newTableData = [...tabledataCostExcludes];
    newTableData.push(costExcludes[index]);
    setTabledataCostExcludes(newTableData);

    const updatedPackages = [...costExcludes];
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
    newTableData.push(costIncludes[index]);
    setTabledataIncludepackages(newTableData);

    const updatedPackages = [...costIncludes];
    updatedPackages.splice(index, 1);
    setCostIncludes(updatedPackages);
  };

  const handleAddItinerary = () => {
    setItinerary([...itinerary, { days: "", event: "", description: "" }]);
  };

  const handleDeleteRow = (record: any) => {
    const newTableData = tableData.filter((item) => item !== record);
    setTableData(newTableData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 3); // Limit to 3 files
      setSelectedFiles(filesArray);
    }
  };

  const columns = [
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Event Title",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
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
      days: itinerary[index].days,
      event: itinerary[index].event,
      description: itinerary[index].description,
    });
    setTableData(newTableData);
    const updatedItinerary = [...itinerary];
    updatedItinerary.splice(index, 1);
    setItinerary(updatedItinerary);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("package_name", packageName);
    formData.append("package_total_persons", packageTotalPersons);
    formData.append("package_category_id", packageCategoryId);
    formData.append("package_type_id", packageTypeId);
    formData.append("package_region_id", packageRegionId);
    formData.append("package_description", packageDescription);
    formData.append("package_rate_normal", packageRateNormal);
    formData.append("package_rate_deluxe", packageRateDeluxe);
    formData.append("package_destination_id", packageCategoryId);
    formData.append("package_duration", packageDuration);
    formData.append(
      "package_details",
      JSON.stringify({
        TripDetailsAndCostSummary: {
          Itinerary: tableData,
          CostIncludes: tabledataIncludepackages,
          CostExcludes: tabledataCostExcludes,
          Highlights: tabledataHighlights,
          Images: selectedFiles.map((file) => file.name),
        },
      })
    );
    selectedFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/tourpackages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Package added successfully:", response.data);
      setPackageName("");
      setPackageDescription("");
      setPackageCategoryId("");
      setPackageTypeId("");
      setPackageRegionId("");
      setPackageDuration("");
      setPackageRateNormal("");
      setPackageRateDeluxe("");
      setPackageTotalPersons("");
      setItinerary([]);
      setTableData([]);
      setCostIncludes([]);
      setCostExcludes([]);
      setHighlights([]);
      setTabledataIncludepackages([]);
      setTabledataCostExcludes([]);
      setTabledataHighlights([]);
      setSelectedFiles([]);
      onSuccess();
      BoxStateChange(false);
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <Modal
      title="Add Package"
      centered
      open={BoxState}
      onOk={() => {
        handleSubmit();
        BoxStateChange(false);
      }}
      onCancel={() => BoxStateChange(false)}
      width={1000}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-5">
        <div className="flex flex-wrap px-5 gap-2">
          <label className="font-semibold w-44">
            Package Name
            <Input
              style={{ marginTop: 5 }}
              type="text"
              onChange={(e) => setPackageName(e.target.value)}
              value={packageName}
              required
            />
          </label>
          <label className="font-semibold w-44">
            Package Persons
            <Input
              style={{ marginTop: 5 }}
              type="text"
              onChange={(e) => setPackageTotalPersons(e.target.value)}
              value={packageTotalPersons}
              required
            />
          </label>
          <label className="font-semibold w-44">
            Package Category
            <Input
              style={{ marginTop: 5 }}
              type="text"
              onChange={(e) => setPackageCategoryId(e.target.value)}
              value={packageCategoryId}
              required
            />
          </label>
          <label className="font-semibold w-44">
            Package Type 
            <Input
              style={{ marginTop: 5 }}
              type="text"
              onChange={(e) => setPackageTypeId(e.target.value)}
              value={packageTypeId}
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
            Package Description
            <Input
              style={{ marginTop: 5 }}
              type="text"
              onChange={(e) => setPackageDescription(e.target.value)}
              value={packageDescription}
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
          <label className="font-semibold w-44">
            Package Duration
            <Input
              style={{ marginTop: 5 }}
              type="text"
              onChange={(e) => setPackageDuration(e.target.value)}
              value={packageDuration}
              required
            />
          </label>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Package Itineraries</h2>
          <Button type="primary" onClick={handleAddItinerary}>
            Add Itinerary
          </Button>
          {itinerary.map((itineraryItem, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold">Package Itinerary {index + 1}</h2>
              <label className="font-semibold flex px-5 flex-col pt-5">
                Days
                <Input
                  style={{ width: 144, marginTop: 5 }}
                  type="number"
                  onChange={(e) => {
                    const newItinerary = [...itinerary];
                    newItinerary[index].days = e.target.value;
                    setItinerary(newItinerary);
                  }}
                  value={itineraryItem.days}
                  required
                />
              </label>
              <div className="flex gap-48 px-5 mt-5">
                <label className="font-semibold w-44">
                  Event Title
                  <Input
                    style={{ height: 100, width: 320, marginRight: 10, marginTop: 5 }}
                    type="text"
                    onChange={(e) => {
                      const newItinerary = [...itinerary];
                      newItinerary[index].event = e.target.value;
                      setItinerary(newItinerary);
                    }}
                    value={itineraryItem.event}
                    required
                  />
                </label>
                <div className="flex justify-center items-center gap-4">
                  <div className="flex flex-col">
                    <label className="font-semibold w-44">
                      Description
                    </label>
                    <Input
                      style={{ height: 100, width: 320, marginTop: 5 }}
                      type="text"
                      onChange={(e) => {
                        const newItinerary = [...itinerary];
                        newItinerary[index].description = e.target.value;
                        setItinerary(newItinerary);
                      }}
                      value={itineraryItem.description}
                      required
                    />
                  </div>
                  <Button className="bg-yellow-400" onClick={() => handleDone(index)}>
                    Done
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {tableData.length > 0 && <Table columns={columns} dataSource={tableData} />}

          <div>
            <h2 className="text-lg font-semibold">Cost Include</h2>
            <Button type="primary" onClick={handleAddPackage}>
              Add Cost Include
            </Button>
            {costIncludes.map((packageItem, index) => (
              <div key={index} className="px-5 py-2 flex flex-col">
                <label className="font-semibold">Package {index + 1}</label>
                <Input
                  style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
                  type="text"
                  value={packageItem}
                  onChange={(e) => {
                    const updatedPackages = [...costIncludes];
                    updatedPackages[index] = e.target.value;
                    setCostIncludes(updatedPackages);
                  }}
                  required
                />
                <Button
                  className="bg-yellow-400 w-20 mx-auto"
                  onClick={() => handleDoneIncludePackages(index)}
                >
                  Done
                </Button>
              </div>
            ))}
          </div>
          {tabledataIncludepackages.length > 0 && (
            <Table
              dataSource={tabledataIncludepackages.map((item) => ({ package: item }))}
              columns={[
                { title: "Package", dataIndex: "package", key: "package" },
                {
                  title: "Action",
                  dataIndex: "",
                  key: "action",
                  render: (_text: any, _record: any, index: number) => (
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeletePackage(index)}
                    />
                  ),
                },
              ]}
            />
          )}

          <div>
            <h2 className="text-lg font-semibold mt-5">Cost Exclude</h2>
            <Button type="primary" onClick={handleAddCostExclude}>
              Add Cost Exclude
            </Button>
            {costExcludes.map((packageItem, index) => (
              <div key={index} className="px-5 py-2 flex flex-col">
                <label className="font-semibold">Package {index + 1}</label>
                <Input
                  style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
                  type="text"
                  value={packageItem}
                  onChange={(e) => {
                    const updatedCost = [...costExcludes];
                    updatedCost[index] = e.target.value;
                    setCostExcludes(updatedCost);
                  }}
                  required
                />
                <Button
                  className="bg-yellow-400 w-20 mx-auto"
                  onClick={() => handleDoneCostExcludes(index)}
                >
                  Done
                </Button>
              </div>
            ))}
          </div>
          {tabledataCostExcludes.length > 0 && (
            <Table
              dataSource={tabledataCostExcludes.map((item) => ({ package: item }))}
              columns={[
                { title: "Cost Exclude", dataIndex: "package", key: "package" },
                {
                  title: "Action",
                  dataIndex: "",
                  key: "action",
                  render: (_text: any, _record: any, index: number) => (
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteCostExcludes(index)}
                    />
                  ),
                },
              ]}
            />
          )}

          <div>
            <h2 className="text-lg font-semibold mt-5">Highlights</h2>
            <Button type="primary" onClick={handleAddHighlights}>
              Add Highlights
            </Button>
            {highlights.map((packageItem, index) => (
              <div key={index} className="px-5 py-2 flex flex-col">
                <label className="font-semibold">Package {index + 1}</label>
                <Input
                  style={{ width: "100%", marginTop: 5, marginBottom: 2 }}
                  type="text"
                  value={packageItem}
                  onChange={(e) => {
                    const updatedHighlight = [...highlights];
                    updatedHighlight[index] = e.target.value;
                    setHighlights(updatedHighlight);
                  }}
                  required
                />
                <Button
                  className="bg-yellow-400 w-20 mx-auto"
                  onClick={() => handleDoneHighlights(index)}
                >
                  Done
                </Button>
              </div>
            ))}
          </div>
          {tabledataHighlights.length > 0 && (
            <Table
              dataSource={tabledataHighlights.map((item) => ({ package: item }))}
              columns={[
                { title: "Highlights", dataIndex: "package", key: "package" },
                {
                  title: "Action",
                  dataIndex: "",
                  key: "action",
                  render: (_text: any, _record: any, index: number) => (
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteHighlights(index)}
                    />
                  ),
                },
              ]}
            />
          )}

          <div>
            <h2 className="text-lg font-semibold mt-5">Package Images (Max 3)</h2>
            <label className="font-semibold px-5">
              <Input
                style={{ width: 240, padding: "25px 10px", marginTop: 10 }}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </label>
            <p>Selected files: {selectedFiles.length} / 3</p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default InsertionBox;