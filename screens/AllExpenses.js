import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total"/>
}