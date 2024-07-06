import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    'https://expense-tracker-react-na-6ff7a-default-rtdb.firebaseio.com/expenses.json',
    expenseData
  );
}