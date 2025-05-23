import React, { useState } from 'react';

export default function CreateAndEditRecord() {
  const [step, setStep] = useState(1);

  // Step 1 - Updated Fields
  const Step1 = () => (
    <div className="space-y-4 p-4">
      <label className="block">
        OP#:
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
      </label>
      <label className="block">
        OPU#:
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
      </label>
      <label className="block">
        EDU#:
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
      </label>
      <label className="block">
        Model Name:
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
      </label>
      <label className="block">
        Model Family:
        <select className="w-full border border-gray-300 rounded px-3 py-2">
          <option value="">Select Model Family</option>
          <option value="Alpha">Alpha</option>
          <option value="Beta">Beta</option>
          <option value="Gamma">Gamma</option>
        </select>
      </label>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-4 p-4">
      <label className="block">
        Revision Number:
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
      </label>
      <label className="block">
        Status:
        <select className="w-full border border-gray-300 rounded px-3 py-2">
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
        </select>
      </label>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-4 p-4">
      <label className="block">
        Created At:
        <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" />
      </label>
      <label className="block">
        Notes:
        <textarea className="w-full border border-gray-300 rounded px-3 py-2" rows={4} />
      </label>
    </div>
  );

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="pt-12">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-white flex-grow">Create Record</h1>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <div className="min-w-full bg-white border border-gray-200 text-black rounded-lg">
            {/* Stepper */}
            <div className="flex justify-between border-b border-gray-300">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  className={`flex-1 py-3 text-center cursor-pointer font-semibold ${
                    step === s ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'
                  }`}
                  onClick={() => setStep(s)}
                >
                  Step {s}
                </button>
              ))}
            </div>

            {/* Step content */}
            <div>
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between p-4">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`px-4 py-2 rounded ${
                  step === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => alert('Submit form')}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
