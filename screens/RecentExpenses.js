import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getLastDays} from "../utility/date";
import {fetchExpenses} from "../utility/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not load expenses!')
      }
      setIsLoading(false);
    }

    getExpenses();
  }, [])

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)}/>
  }

  if (isLoading) {
    return <LoadingOverlay/>
  }

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const recentSevenDays = getLastDays(today, 7);

    return (expense.date > recentSevenDays) && (expense.date <= today);
  })

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 days'
      fallBackText='No expenses in the last 7 days'/>
  )
}