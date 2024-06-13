import {View, StyleSheet} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Pair of shoes',
    amount: 59.99,
    date: new Date('2019-12-19')
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
    date: new Date('2016-01-20')
  },
  {
    id: 'e5',
    description: 'Laptop',
    amount: 1200.49,
    date: new Date('2018-03-01')
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

export default function ExpensesOutput({expenses, expensesPeriod}) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1
  }
})