import {createContext, useReducer} from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Pair of shoes',
    amount: 59.99,
    date: new Date('2024-06-15')
  },
  {
    id: 'e2',
    description: 'Pair of trousers',
    amount: 129.99,
    date: new Date('2019-07-19')
  },
  {
    id: 'e3',
    description: 'Scissors',
    amount: 34.57,
    date: new Date('2018-01-20')
  },
  {
    id: 'e4',
    description: 'Book',
    amount: 13.45,
    date: new Date('2024-06-09')
  },
  {
    id: 'e5',
    description: 'Laptop',
    amount: 1200.49,
    date: new Date('2024-06-11')
  },
  {
    id: 'e6',
    description: 'Pair of shoes',
    amount: 59.99,
    date: new Date('2019-12-19')
  },
  {
    id: 'e7',
    description: 'Pair of trousers',
    amount: 129.99,
    date: new Date('2019-07-19')
  },
  {
    id: 'e8',
    description: 'Scissors',
    amount: 34.57,
    date: new Date('2018-01-20')
  },
  {
    id: 'e9',
    description: 'Book',
    amount: 13.45,
    date: new Date('2016-01-20')
  },
  {
    id: 'e10',
    description: 'Laptop',
    amount: 1200.49,
    date: new Date('2018-03-01')
  }
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expenses => expenses.id !== action.payload);
    default: return state;
  }
}

export default function ExpensesContextProvider({children}) {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }

  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expenseState,
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