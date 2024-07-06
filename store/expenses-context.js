import {createContext, useReducer} from "react";


export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {},
  setExpenses: (expenses) => []
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expenses => expenses.id !== action.payload);
    case 'SET':
      return action.payload.reverse();
    default: return state;
  }
}

export default function ExpensesContextProvider({children}) {
  const [expenseState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenses) {
    dispatch({type: 'ADD', payload: expenses});
  }

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses});
  }

  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }

  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expenseState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}