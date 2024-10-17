import { useEffect, useState } from "react";
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
  const [editId, setEditId] = useState(null);
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
    if (editId) {
      // Edit existing transaction
      const updatedData = data.map((transaction) =>
        transaction.id === editId ? newTransaction : transaction
      );
      setData(updatedData);
      setEditId(null); // Reset editId after updating
    } else {
      // Add new transaction
      setData([...data, newTransaction]);
    }

    // Reset form fields
    setCategory("");
    setAmount("");
    setDate("");
    setType("expense");
  };

  const handleEdit = (transaction) => {
    setCategory(transaction.category);
    setAmount(transaction.amount);
    setDate(transaction.date);
    setType(transaction.type);
    setEditId(transaction.id); // Set the id of the item being edited
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmDelete) {
      const updatedData = data.filter((transaction) => transaction.id !== id);
      setData(updatedData);
    }
  };
  const income = data.filter((transaction) => transaction.type === "income");
  const expenses = data.filter((transaction) => transaction.type === "expense");

  const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  useEffect(() => {
    if (type === "income") {
      setCategory("Salary");
    } else {
      setCategory("Education");
    }
  }, [type]);
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
          <Income income={income} onEdit={handleEdit} onDelete={handleDelete} />
          <Expense
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};

export default TrackingBoard;
