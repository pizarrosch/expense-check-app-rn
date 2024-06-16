import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getLastDays} from "../utility/date";

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const recentSevenDays = getLastDays(today, 7);

    return (expense.date > recentSevenDays) && (expense.date <= today);
  })
  return <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 days' fallBackText='No expenses in the last 7 days'/>
}