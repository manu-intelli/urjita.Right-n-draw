// import React, { useState, useEffect } from "react";
// import { Input, Select } from "../../components/common/ReusableComponents";
// import { Plus, Trash2 } from "lucide-react";

// const yesNoOptions = [
//   { label: "Yes", value: "Yes" },
//   { label: "No", value: "No" },
// ];

// const qualificationOptions = [
//   { label: "Qualified", value: "Qualified" },
//   { label: "Unqualified", value: "Unqualified" },
// ];

// const ConditionalStudentTable = () => {
//   const rowsNeeded = 10; // Number of rows to create
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const initialRows = Array.from({ length: rowsNeeded }, () => ({
//       name: "",
//       hasBp: "",
//       bpNumber: "",
//       hasSupplier: "",
//       supplierName: "",
//       supplierNumber: "",
//       qualification: "",
//     }));
//     setStudents(initialRows);
//   }, []);

//   const handleChange = (index, field, value) => {
//     const updated = [...students];
//     updated[index] = { ...updated[index], [field]: value };
//     setStudents(updated);
//   };

//   const handleRemoveRow = (index) => {
//     const updated = [...students];
//     updated.splice(index, 1);
//     setStudents(updated);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">
//           Student Information
//         </h2>
//         <button
//           onClick={() =>
//             setStudents([
//               ...students,
//               {
//                 name: "",
//                 hasBp: "",
//                 bpNumber: "",
//                 hasSupplier: "",
//                 supplierName: "",
//                 supplierNumber: "",
//                 qualification: "",
//               },
//             ])
//           }
//           className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm transition"
//         >
//           <Plus size={18} />
//           Add Row
//         </button>
//       </div>

//       <div className="space-y-6">
//         {students.map((item, index) => (
//           <div
//             key={index}
//             className="flex justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
//           >
//             {/* Name Field */}
//             <div className="flex-1 mx-2">
//               <Input
//                 label={"Component Name"}
//                 value={item.name}
//                 onChange={(value) => handleChange(index, "name", value)}
//                 placeholder="Enter Name"
//                 className="w-full bg-gray-200 text-black p-2 rounded-md"
//               />
//             </div>

//             {/* BP Field */}
//             <div className="flex-1 mx-2">
//               <Select
//                 label={"Has B-P/N"}
//                 options={yesNoOptions}
//                 value={item.hasBp}
//                 onChange={(value) => handleChange(index, "hasBp", value)}
//                 className="w-full bg-gray-200 text-black p-2 rounded-md"
//               />
//             </div>

//             {/* BP Number (Visible only when BP is Yes) */}
//             {item.hasBp === "Yes" && (
//               <div className="flex-1 mx-2">
//                 <Input
//                   label={"Bp Number"}
//                   value={item.bpNumber}
//                   onChange={(value) => handleChange(index, "bpNumber", value)}
//                   placeholder="Enter BP Number"
//                   className="w-full bg-gray-200 text-black p-2 rounded-md"
//                 />
//               </div>
//             )}

//             {/* Supplier Field (Visible only when BP is No) */}
//             {item.hasBp === "No" && (
//               <div className="flex-1 mx-2">
//                 <Select
//                   label={"Has Supplier"}
//                   options={yesNoOptions}
//                   value={item.hasSupplier}
//                   onChange={(value) =>
//                     handleChange(index, "hasSupplier", value)
//                   }
//                   className="w-full bg-gray-200 text-black p-2 rounded-md"
//                 />
//               </div>
//             )}

//             {/* Supplier Name and Supplier P/N (Visible only when BP is No and Supplier is Yes) */}
//             {item.hasBp === "No" && item.hasSupplier === "Yes" && (
//               <>
//                 <div className="flex-1 mx-2">
//                   <Input
//                     label={"Supplier Name"}
//                     value={item.supplierName}
//                     onChange={(value) =>
//                       handleChange(index, "supplierName", value)
//                     }
//                     placeholder="Supplier Name"
//                     className="w-full bg-gray-200 text-black p-2 rounded-md"
//                   />
//                 </div>
//                 <div className="flex-1 mx-2">
//                   <Input
//                     label={"Supplier Number"}
//                     value={item.supplierNumber}
//                     onChange={(value) =>
//                       handleChange(index, "supplierNumber", value)
//                     }
//                     placeholder="Supplier P/N"
//                     className="w-full bg-gray-200 text-black p-2 rounded-md"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Qualification Field (Visible only when BP is No and Supplier is No) */}
//             {item.hasBp === "No" && item.hasSupplier === "No" && (
//               <div className="flex-1 mx-2">
//                 <Select
//                   options={qualificationOptions}
//                   value={item.qualification}
//                   onChange={(value) =>
//                     handleChange(index, "qualification", value)
//                   }
//                   className="w-full bg-gray-200 text-black p-2 rounded-md"
//                 />
//               </div>
//             )}

//             {/* Remove Button */}
//             <div className="flex items-center justify-center mx-2">
//               <button
//                 onClick={() => handleRemoveRow(index)}
//                 className="text-red-600 hover:text-red-700 transition"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConditionalStudentTable;

import React, { useState, useEffect } from "react";
import { Input, Select } from "../../components/common/ReusableComponents";
import { Plus, Trash2 } from "lucide-react";

const yesNoOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const qualificationOptions = [
  { label: "Qualified", value: "Qualified" },
  { label: "Approval", value: "Approval" },
];

const ConditionalStudentTable = () => {
  const [students, setStudents] = useState([]);
  const [rowsNeeded, setRowsNeeded] = useState(10); // Set the initial number of rows

  useEffect(() => {
    const initialRows = Array.from({ length: rowsNeeded }, () => ({
      name: "",
      hasBp: "",
      bpNumber: "",
      hasSupplier: "",
      supplierName: "",
      supplierNumber: "",
      qualification: "",
    }));
    setStudents(initialRows); // Update the rows dynamically
  }, [rowsNeeded]); // Recreate rows whenever rowsNeeded changes

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index] = { ...updated[index], [field]: value };
    setStudents(updated);
  };

  const handleRemoveRow = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Capacitor Details</h2>
      </div>

      {/* Input for number of rows */}
      <div className="mb-4">
        <Input
          label="Number of Capacitors Needed"
          value={rowsNeeded}
          onChange={(val) => {
            const value = Number(val);
            if (value > 0) setRowsNeeded(value);
          }}
          placeholder="Enter number of rows"
          type="number"
          className="w-full bg-gray-200 text-black p-2 rounded-md"
          required
        />
      </div>

      <div className="space-y-6">
        {students.map((item, index) => (
          <div
            key={index}
            className="flex justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {/* Name Field */}
            <div className="flex-1 mx-2">
              <Input
                label={`Capacitor ${index + 1}`}
                value={item.name}
                onChange={(value) => handleChange(index, "name", value)}
                placeholder="Enter Name"
                className="w-full bg-gray-200 text-black p-2 rounded-md"
              />
            </div>

            {/* BP Field */}
            <div className="flex-1 mx-2">
              <Select
                label={"Has B-P/N"}
                options={yesNoOptions}
                value={item.hasBp}
                onChange={(value) => handleChange(index, "hasBp", value)}
                className="w-full bg-gray-200 text-black p-2 rounded-md"
              />
            </div>

            {/* BP Number (Visible only when BP is Yes) */}
            {item.hasBp === "Yes" && (
              <div className="flex-1 mx-2">
                <Input
                  label={"Bp Number"}
                  value={item.bpNumber}
                  onChange={(value) => handleChange(index, "bpNumber", value)}
                  placeholder="Enter BP Number"
                  className="w-full bg-gray-200 text-black p-2 rounded-md"
                />
              </div>
            )}

            {/* Supplier Field (Visible only when BP is No) */}
            {item.hasBp === "No" && (
              <div className="flex-1 mx-2">
                <Select
                  label={"Has Supplier"}
                  options={yesNoOptions}
                  value={item.hasSupplier}
                  onChange={(value) =>
                    handleChange(index, "hasSupplier", value)
                  }
                  className="w-full bg-gray-200 text-black p-2 rounded-md"
                />
              </div>
            )}

            {/* Supplier Name and Supplier P/N (Visible only when BP is No and Supplier is Yes) */}
            {item.hasBp === "No" && item.hasSupplier === "Yes" && (
              <>
                <div className="flex-1 mx-2">
                  <Input
                    label={"Supplier Name"}
                    value={item.supplierName}
                    onChange={(value) =>
                      handleChange(index, "supplierName", value)
                    }
                    placeholder="Supplier Name"
                    className="w-full bg-gray-200 text-black p-2 rounded-md"
                  />
                </div>
                <div className="flex-1 mx-2">
                  <Input
                    label={"Supplier Number"}
                    value={item.supplierNumber}
                    onChange={(value) =>
                      handleChange(index, "supplierNumber", value)
                    }
                    placeholder="Supplier P/N"
                    className="w-full bg-gray-200 text-black p-2 rounded-md"
                  />
                </div>
              </>
            )}

            {/* Qualification Field (Visible only when BP is No and Supplier is No) */}
            {item.hasBp === "No" && item.hasSupplier === "No" && (
              <div className="flex-1 mx-2">
                <Select
                  label={"Qualification"}
                  options={qualificationOptions}
                  value={item.qualification}
                  onChange={(value) =>
                    handleChange(index, "qualification", value)
                  }
                  className="w-full bg-gray-200 text-black p-2 rounded-md"
                />
              </div>
            )}

            {/* Remove Button */}
            <div className="flex items-center justify-center mx-2">
              <button
                onClick={() => handleRemoveRow(index)}
                className="text-red-600 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionalStudentTable;

// import React, { useState, useEffect } from "react";
// import { Input, Select } from "../../components/common/ReusableComponents";
// import { Plus, Trash2 } from "lucide-react";

// const yesNoOptions = [
//   { label: "Yes", value: "Yes" },
//   { label: "No", value: "No" },
// ];

// const qualificationOptions = [
//   { label: "Qualified", value: "Qualified" },
//   { label: "Unqualified", value: "Unqualified" },
// ];

// const ConditionalStudentTable = () => {
//   const [students, setStudents] = useState([]);
//   const [rowsNeeded, setRowsNeeded] = useState(10); // Set the initial number of rows

//   useEffect(() => {
//     const initialRows = Array.from({ length: rowsNeeded }, () => ({
//       name: "",
//       hasBp: "",
//       bpNumber: "",
//       hasSupplier: "",
//       supplierName: "",
//       supplierNumber: "",
//       qualification: "",
//     }));
//     setStudents(initialRows); // Update the rows dynamically
//   }, [rowsNeeded]); // Recreate rows whenever rowsNeeded changes

//   const handleChange = (index, field, value) => {
//     const updated = [...students];
//     updated[index] = { ...updated[index], [field]: value };
//     setStudents(updated);
//   };

//   const handleRemoveRow = (index) => {
//     const updated = [...students];
//     updated.splice(index, 1);
//     setStudents(updated);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Capacitor Details</h2>
//       </div>

//       {/* Input for number of rows */}
//       <div className="mb-4">
//         <Input
//           label="Number of Capacitors Needed"
//           value={rowsNeeded}
//           onChange={(val) => {
//             const value = Number(val);
//             if (value > 0) setRowsNeeded(value);
//           }}
//           placeholder="Enter number of rows"
//           type="number"
//           className="w-full bg-gray-200 text-black p-2 rounded-md"
//           required
//         />
//       </div>

//       <div className="space-y-6">
//         {students.map((item, index) => (
//           <div
//             key={index}
//             className="flex justify-between p-4 rounded-lg transition-all"
//           >
//             {/* Card Wrapper for Each Field */}
//             <div className="flex-1 mx-2 bg-white shadow-md rounded-lg p-4">
//               {/* Name Field */}
//               <Input
//                 label={`Capacitor ${index + 1}`}
//                 value={item.name}
//                 onChange={(value) => handleChange(index, "name", value)}
//                 placeholder="Enter Name"
//                 className="w-full bg-gray-200 text-black p-2 rounded-md"
//               />
//             </div>

//             <div className="flex-1 mx-2 bg-white shadow-md rounded-lg p-4">
//               {/* BP Field */}
//               <Select
//                 label={"Has B-P/N"}
//                 options={yesNoOptions}
//                 value={item.hasBp}
//                 onChange={(value) => handleChange(index, "hasBp", value)}
//                 className="w-full bg-gray-200 text-black p-2 rounded-md"
//               />
//             </div>

//             {item.hasBp === "Yes" && (
//               <div className="flex-1 mx-2 bg-white shadow-md rounded-lg p-4">
//                 {/* BP Number */}
//                 <Input
//                   label={"Bp Number"}
//                   value={item.bpNumber}
//                   onChange={(value) => handleChange(index, "bpNumber", value)}
//                   placeholder="Enter BP Number"
//                   className="w-full bg-gray-200 text-black p-2 rounded-md"
//                 />
//               </div>
//             )}

//             {item.hasBp === "No" && (
//               <div className="flex-1 mx-2 bg-white shadow-md rounded-lg p-4">
//                 {/* Supplier Field */}
//                 <Select
//                   label={"Has Supplier"}
//                   options={yesNoOptions}
//                   value={item.hasSupplier}
//                   onChange={(value) => handleChange(index, "hasSupplier", value)}
//                   className="w-full bg-gray-200 text-black p-2 rounded-md"
//                 />
//               </div>
//             )}

//             {item.hasBp === "No" && item.hasSupplier === "Yes" && (
//               <>
//                 <div className="flex-1 mx-2 bg-white shadow-md rounded-lg p-4">
//                   {/* Supplier Name */}
//                   <Input
//                     label={"Supplier Name"}
//                     value={item.supplierName}
//                     onChange={(value) => handleChange(index, "supplierName", value)}
//                     placeholder="Supplier Name"
//                     className="w-full bg-gray-200 text-black p-2 rounded-md"
//                   />
//                 </div>
//                 <div className="flex-1 mx-2 bg-white shadow-md rounded-lg p-4">
//                   {/* Supplier Number */}
//                   <Input
//                     label={"Supplier Number"}
//                     value={item.supplierNumber}
//                     onChange={(value) => handleChange(index, "supplierNumber", value)}
//                     placeholder="Supplier P/N"
//                     className="w-full bg-gray-200 text-black p-2 rounded-md"
//                   />
//                 </div>
//               </>
//             )}

//             {item.hasBp === "No" && item.hasSupplier === "No" && (
//               <div className="flex-1 mx-2 bg-white shadow-md rounded-lg p-4">
//                 {/* Qualification Field */}
//                 <Select
//                   label={"Qualification"}
//                   options={qualificationOptions}
//                   value={item.qualification}
//                   onChange={(value) => handleChange(index, "qualification", value)}
//                   className="w-full bg-gray-200 text-black p-2 rounded-md"
//                 />
//               </div>
//             )}

//             <div className="flex items-center justify-center mx-2">
//               {/* Remove Button */}
//               <button
//                 onClick={() => handleRemoveRow(index)}
//                 className="text-red-600 hover:text-red-700 transition"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConditionalStudentTable;
