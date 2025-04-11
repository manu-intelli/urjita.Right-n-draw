import { FormSection } from "../../../components/common/ReusableComponents";
import PartDetails from "./Parts";


const renderStepContent = () => {
  switch (STEP_ORDER[currentStep]) {
    case STEPS.BASIC_INFO:
      return (
        <FormSection title="Basic Information">
    <PartDetails type={type} index={index} item={item} />

        </FormSection>
      );
    default:
      return null;
  }
};


const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-4 px-4">
      {STEP_ORDER.map((stepKey, index) => (
        <div key={stepKey} className="flex items-center flex-1 last:flex-none">
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center font-medium shadow-sm
              ${
                currentStep === index
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : currentStep > index
                  ? "bg-green-400 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-400"
              }
              transition-all duration-200 relative z-10
            `}
          >
            {currentStep > index ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          {index < STEP_ORDER.length - 1 && (
            <div className="flex-1 relative">
              <div
                className={`
                  absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1
                  ${currentStep > index ? "bg-green-400" : "bg-gray-200"}
                  transition-colors duration-300
                `}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );


  const CreationInterface =()=>{
    return (
        <div className="min-h-screen bg-neutral-900 p-4 sm:p-8 md:p-16">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 w-full max-w-7xl mx-auto">
            <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-neutral-200">
              <div className="w-full text-center">
                <h1 className="text-2xl font-semibold text-neutral-900 mb-6">
                  Page 21 Creation Interface
                </h1>
                {renderStepIndicator()}
              </div>
            </div>
    
            <div className="flex-1">
              <div className="px-4 sm:px-6 md:px-8 py-6">
                {loading.initial ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                  </div>
                ) : (
                  renderStepContent()
                )}
              </div>
            </div>
    
            <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-neutral-200">
              <div className="max-w-7xl mx-auto flex justify-between">
                <div>
                  {!submitted && currentStep > 0 && (
                    <Button
                      variant="secondary"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>
                  )}
                </div>
    
            
                  <Button
                    variant="primary"
                    onClick={
                      currentStep === 0
                        ? checkTemplateExistence
                        : currentStep === STEP_ORDER.length - 2
                        ? handleSubmit
                        : () => setCurrentStep((prev) => prev + 1)
                    }
                    disabled={
                      loading.submission ||
                      checkingTemplate ||
                      (currentStep === 0 &&
                        7 !==
                          Object.values(formData?.[STEPS.BASIC_INFO]).filter(
                            (itr) => itr
                          ).length) ||
                      templateExists ||
                      (currentStep === 1 &&
                        apiData.specifications?.length !==
                          Object.values(
                            formData?.[STEPS.PCB_SPECS]?.selectedSpecs
                          ).filter((itr) => itr).length) ||
                      (currentStep === 2 &&
                        !apiData.verifierFields.every(({ id }) => {
                          const val =
                            formData?.[STEPS.VERIFIER_FIELDS].verifierQueryData?.[
                              id
                            ];
                          return [9, 15, 16, 18].includes(id)
                            ? val !== null && val !== undefined && val !== ""
                            : Number(val) > 0;
                        }))
                    }
                  >
                    {checkingTemplate ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        <span>Checking...</span>
                      </div>
                    ) : loading.submission ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      </div>
                    ) : currentStep === STEP_ORDER.length - 2 ? (
                      "Submit"
                    ) : (
                      "Next"
                    )}
                  </Button>
                
              </div>
            </div>
          </div>
        </div>
      );
  }