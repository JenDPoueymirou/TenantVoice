type Step = {
  id: number;
  name: string;
};

type IssueFormStepsProps = {
  steps: Step[];
  currentStep: number;
};

const IssueFormSteps = ({ steps, currentStep }: IssueFormStepsProps) => {
  return (
    <div className="bg-neutral-100 rounded-xl p-4 mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center">
            <div 
              className={`rounded-full ${
                step.id === currentStep 
                  ? "bg-primary-dark text-white" 
                  : step.id < currentStep
                    ? "bg-primary-light text-white"
                    : "bg-neutral-300 text-neutral-600"
              } w-8 h-8 flex items-center justify-center text-sm font-medium`}
            >
              {step.id}
            </div>
            <span className={`hidden sm:block ml-2 text-sm font-medium ${
              step.id === currentStep 
                ? "text-neutral-700" 
                : "text-neutral-500"
            }`}>
              {step.name}
            </span>
            {step.id !== steps.length && (
              <span className="material-icons text-neutral-300 mx-2">chevron_right</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueFormSteps;
