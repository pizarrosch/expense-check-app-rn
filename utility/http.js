import axios from "axios";

const requestUrl = 'https://expense-tracker-react-na-6ff7a-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await axios.post(
    requestUrl + '/expenses.json',
    expenseData
  );
  return response.data.name;
}

export async function fetchExpenses() {
  const response = await axios.get(requestUrl + '/expenses.json');
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    }

    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(requestUrl + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
  return axios.delete(requestUrl + `/expenses/${id}.json`);
}