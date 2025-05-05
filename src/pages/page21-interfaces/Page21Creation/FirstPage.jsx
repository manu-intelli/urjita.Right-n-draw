import React, { useState, useRef } from "react";
import { usePage21Context } from "../../../context/Page21Context";
import {
  FormSection,
  Input,
  Select,
} from "../../../components/common/ReusableComponents";

const modelFamilyOptions = [
  { label: "Family A", value: "FamilyA" },
  { label: "FamilyB", value: "FamilyB" },
  { label: "Family C", value: "FamilyC" },
];
export const technologyOptions = [
  { label: "Lumped Technology", value: "lumped" },
  { label: "Ceramic Resonator Technology", value: "ceramic_resonators" },
  { label: "Thin Film", value: "thin_film" }, 
  { label: "SIW", value: "siw" }, 
  { label: "DOCSIS Diplexer", value: "docs_diplexer" }, 
];

const Page21FirstPage = () => {
  const { state, dispatch } = usePage21Context();

  // Handle input changes
  const handleChange = (field, value) => {
    dispatch({
      type: "SET_FIELD",
      payload: { field, value },
    });
  };

  return (
    <>
      <div className="min-h-screen bg-neutral-900 p-4 sm:p-8 md:p-16">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 w-full max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-neutral-200">
            <div className="w-full text-center">
              <h1 className="text-2xl font-semibold text-neutral-900 mb-6">
                Page 21 Creation Interface
              </h1>
            </div>
          </div>

          <div className="flex-1">
            <div className="px-4 sm:px-6 md:px-8 py-6">
              <div className="border p-4 rounded-md shadow-sm mb-6">
                {/* <h2 className="text-lg font-semibold mb-4">Shield Details</h2> */}
                <FormSection title="General Details">
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="OP Number"
                        value={state.opNumber || ""}
                        onChange={(value) => handleChange("opNumber", value)}
                        required
                      />
                      <Input
                        label="OPU Number"
                        value={state.opuNumber || ""}
                        onChange={(value) => handleChange("opuNumber", value)}
                        required
                      />
                      <Input
                        label="EDU Number"
                        value={state.eduNumber || ""}
                        onChange={(value) => handleChange("eduNumber", value)}
                        required
                      />

                      <Select
                        label="Model Family"
                        value={state.modelFamily}
                        options={modelFamilyOptions}
                        onChange={(value) => handleChange("modelFamily", value)}
                        required
                      />

                      <Input
                        label="Model Name"
                        value={state.modelName || ""}
                        onChange={(value) => handleChange("modelName", value)}
                        required
                      />

                      <Select
                        label="Technology"
                        value={state.technology}
                        options={technologyOptions}
                        onChange={(value) => handleChange("technology", value)}
                        required
                      />
                    </div>
                  </div>
                </FormSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page21FirstPage;
