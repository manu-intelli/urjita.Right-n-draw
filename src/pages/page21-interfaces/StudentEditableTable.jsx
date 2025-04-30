// import React, { useState } from "react";
// import { Input, Select } from "../../components/common/ReusableComponents";
// import { Trash2 } from "lucide-react";

// const yesNoOptions = [
//   { label: "Yes", value: "Yes" },
//   { label: "No", value: "No" },
// ];

// const qualificationOptions = [
//   { label: "Qualification", value: "Qualification" },
//   { label: "Approval", value: "Approval" },
// ];

// const CapacitorTables = () => {
//   const [numWithBp, setNumWithBp] = useState("");
//   const [numWithoutBp, setNumWithoutBp] = useState("");
//   const [studentsWithBp, setStudentsWithBp] = useState([]);
//   const [studentsWithoutBp, setStudentsWithoutBp] = useState([]);

//   const handleChange = (index, field, value, isBpTable) => {
//     const updated = isBpTable ? [...studentsWithBp] : [...studentsWithoutBp];
//     updated[index] = { ...updated[index], [field]: value };
//     isBpTable ? setStudentsWithBp(updated) : setStudentsWithoutBp(updated);
//   };

//   const handleRemoveRow = (index, isBpTable) => {
//     const updated = isBpTable ? [...studentsWithBp] : [...studentsWithoutBp];
//     updated.splice(index, 1);
//     isBpTable ? setStudentsWithBp(updated) : setStudentsWithoutBp(updated);
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg flex flex-col">
//       {/* Sticky Input Section */}

//       {/* Fixed Input Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 sticky top-0 bg-gray-50 z-10 pb-4">
//         <div>
//           <Input
//             label="Number of Capacitors with BP Number"
//             value={numWithBp}
//             onChange={(val) => setNumWithBp(Math.max(0, Number(val)))}
//             type="number"
//             required
//             className="p-3 text-lg border border-gray-300 rounded-md"
//           />
//         </div>
//         <div>
//           <Input
//             label="Number of Capacitors without BP Number"
//             value={numWithoutBp}
//             onChange={(val) => setNumWithoutBp(Math.max(0, Number(val)))}
//             type="number"
//             required
//             className="p-3 text-lg border border-gray-300 rounded-md"
//           />
//         </div>
//       </div>

//       {/* Scrollable capacitor entry section */}
//       <div className="overflow-y-auto pr-1 space-y-6 flex-1">
//         {/* ... the rest of your capacitor tables */}
//       </div>

//       {/* Scrollable content */}
//       <div className="overflow-y-auto mt-4 space-y-6 pr-1">
//         {/* Capacitors with BP Number */}
//         {numWithBp > 0 && (
//           <div>
//             <h3 className="text-md font-semibold text-gray-800 m-2">
//               Capacitors with BP Number
//             </h3>

//             <div className="space-y-4">
//               {Array.from({ length: numWithBp }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-wrap bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
//                 >
//                   <div className="flex-1 mx-2 min-w-[200px]">
//                     <Input
//                       label={`Capacitor ${index + 1} Name`}
//                       value={studentsWithBp[index]?.name || ""}
//                       onChange={(value) =>
//                         handleChange(index, "name", value, true)
//                       }
//                       placeholder="Enter Name"
//                       className="p-3 text-lg border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div className="flex-1 mx-2 min-w-[200px]">
//                     <Input
//                       label="BP Number"
//                       value={studentsWithBp[index]?.bpNumber || ""}
//                       onChange={(value) =>
//                         handleChange(index, "bpNumber", value, true)
//                       }
//                       placeholder="Enter BP Number"
//                       className="p-3 text-lg border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div className="flex items-center justify-center mx-2 mt-7">
//                     <button
//                       onClick={() => handleRemoveRow(index, true)}
//                       className="text-red-600 hover:text-red-700 transition"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Capacitors without BP Number */}
//         {numWithoutBp > 0 && (
//           <div>
//             <h3 className="text-md font-semibold text-gray-800 m-2">
//               Capacitors without BP Number
//             </h3>

//             <div className="space-y-4">
//               {Array.from({ length: numWithoutBp }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-wrap bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
//                 >
//                   <div className="flex-1 mx-2 min-w-[200px]">
//                     <Input
//                       label={`Capacitor ${index + 1} Name`}
//                       value={studentsWithoutBp[index]?.name || ""}
//                       onChange={(value) =>
//                         handleChange(index, "name", value, false)
//                       }
//                       placeholder="Enter Name"
//                       className="p-3 text-lg border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div className="flex-1 mx-2 min-w-[200px]">
//                     <Input
//                       label="Supplier Name"
//                       value={studentsWithoutBp[index]?.supplierName || ""}
//                       onChange={(value) =>
//                         handleChange(index, "supplierName", value, false)
//                       }
//                       placeholder="Enter Supplier Name"
//                       className="p-3 text-lg border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="flex-1 mx-2 min-w-[200px]">
//                     <Input
//                       label="Supplier P/N"
//                       value={studentsWithoutBp[index]?.supplierNumber || ""}
//                       onChange={(value) =>
//                         handleChange(index, "supplierNumber", value, false)
//                       }
//                       placeholder="Enter Supplier P/N"
//                       className="p-3 text-lg border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div className="flex-1 mx-2 min-w-[200px]">
//                     <Select
//                       label="Qualification Status"
//                       value={studentsWithoutBp[index]?.qualificationStaus || ""}
//                       options={qualificationOptions}
//                       onChange={(value) =>
//                         handleChange(index, "qualificationStaus", value, false)
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="flex items-center justify-center mx-2 mt-7">
//                     <button
//                       onClick={() => handleRemoveRow(index, false)}
//                       className="text-red-600 hover:text-red-700 transition"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CapacitorTables;

import React, { useState } from "react";
import { Input, Select } from "../../components/common/ReusableComponents";
import { Trash2 } from "lucide-react";

const qualificationOptions = [
  { label: "Qualification", value: "Qualification" },
  { label: "Approval", value: "Approval" },
];

const CapacitorTables = () => {
  const [numWithBp, setNumWithBp] = useState(0);
  const [numWithoutBp, setNumWithoutBp] = useState(0);

  const [studentsWithBp, setStudentsWithBp] = useState([]);
  const [studentsWithoutBp, setStudentsWithoutBp] = useState([]);

  const handleCountChange = (value, isBp) => {
    const count = parseInt(value, 10) || 0;
    if (isBp) {
      setNumWithBp(count);
      const newRows = Array.from({ length: count }, (_, i) => ({
        name: studentsWithBp[i]?.name || "",
        bpNumber: studentsWithBp[i]?.bpNumber || "",
      }));
      setStudentsWithBp(newRows);
    } else {
      setNumWithoutBp(count);
      const newRows = Array.from({ length: count }, (_, i) => ({
        name: studentsWithoutBp[i]?.name || "",
        supplierName: studentsWithoutBp[i]?.supplierName || "",
        supplierNumber: studentsWithoutBp[i]?.supplierNumber || "",
        qualificationStaus: studentsWithoutBp[i]?.qualificationStaus || "",
      }));
      setStudentsWithoutBp(newRows);
    }
  };

  const handleChange = (index, field, value, isBpTable) => {
    const updated = isBpTable ? [...studentsWithBp] : [...studentsWithoutBp];
    updated[index] = { ...updated[index], [field]: value };
    isBpTable ? setStudentsWithBp(updated) : setStudentsWithoutBp(updated);
  };

  return (
    <div className="p-2 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg flex flex-col space-y-6">
      {/* Ask for Number of Capacitors */}
      <div className="sticky top-0 bg-white z-10 p-6 w-full shadow-md">
        <div className="flex gap-6">
          <div className="flex-1">
            <Input
              label="Number of Capacitors with BP Number"
              type="number"
              value={numWithBp}
              onChange={(val) => handleCountChange(val, true)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Input
              label="Number of Capacitors without BP Number"
              type="number"
              value={numWithoutBp}
              onChange={(val) => handleCountChange(val, false)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Capacitors with BP Number */}
      {studentsWithBp.length > 0 && (
        <div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="text-md font-semibold text-gray-800 ">
              Capacitors with BP Number
            </h3>
          </div>
          <div className="space-y-4">
            {studentsWithBp.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
              >
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label={`Capacitor ${index + 1} Name`}
                    value={item.name}
                    onChange={(value) =>
                      handleChange(index, "name", value, true)
                    }
                    placeholder="Enter Name"
                  />
                </div>
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label="BP Number"
                    value={item.bpNumber}
                    onChange={(value) =>
                      handleChange(index, "bpNumber", value, true)
                    }
                    placeholder="Enter BP Number"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Capacitors without BP Number */}
      {studentsWithoutBp.length > 0 && (
        <div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h3 className="text-md font-semibold text-gray-800 ">
              Capacitors without BP Number
            </h3>
          </div>
          <div className="space-y-4">
            {studentsWithoutBp.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
              >
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label={`Capacitor ${index + 1} Name`}
                    value={item.name}
                    onChange={(value) =>
                      handleChange(index, "name", value, false)
                    }
                    placeholder="Enter Name"
                  />
                </div>
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label="Supplier Name"
                    value={item.supplierName}
                    onChange={(value) =>
                      handleChange(index, "supplierName", value, false)
                    }
                    placeholder="Enter Supplier Name"
                  />
                </div>
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Input
                    label="Supplier P/N"
                    value={item.supplierNumber}
                    onChange={(value) =>
                      handleChange(index, "supplierNumber", value, false)
                    }
                    placeholder="Enter Supplier P/N"
                  />
                </div>
                <div className="flex-1 mx-2 min-w-[200px]">
                  <Select
                    label="Qualification Status"
                    value={item.qualificationStaus}
                    options={qualificationOptions}
                    onChange={(value) =>
                      handleChange(index, "qualificationStaus", value, false)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CapacitorTables;
