import BalanceStat from "./BalanceStat";
import Expense from "./Expense";
import Income from "./Income";
import SubmissionForm from "./SubmissionForm";

const TrackingBoard = () => {
  return (
    <>
      <SubmissionForm />
      <div className="lg:col-span-2">
        <BalanceStat />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <Expense />
          <Income />
        </div>
      </div>
    </>
  );
};

export default TrackingBoard;
