import { useState } from "react";
import { transactions } from "../assets/demoData";
import BalanceStat from "./BalanceStat";

import Expense from "./Expense";
import Income from "./Income";
import SubmissionForm from "./SubmissionForm";
const TrackingBoard = () => {
  const [data, setData] = useState(transactions);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount || !date) {
      alert("Please fill in all fields.");
      return;
    }
    // Create a new transaction object
    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: parseFloat(amount),
      date,
    };
    console.log(newTransaction);

    setData([...data, newTransaction]);
    // Reset form fields
    setCategory("");
    setAmount("");
    setDate("");
  };
  const income = data.filter((transaction) => transaction.type === "income");
  const expenses = data.filter((transaction) => transaction.type === "expense");

  const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  return (
    <>
      <SubmissionForm
        category={category}
        amount={amount}
        type={type}
        date={date}
        setType={setType}
        onDataSubmit={handleSubmit}
        setCategory={setCategory}
        setAmount={setAmount}
        setDate={setDate}
      />
      <div className="lg:col-span-2">
        <BalanceStat
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <Income income={income} />
          <Expense expenses={expenses} />
        </div>
      </div>
    </>
  );
};

export default TrackingBoard;
