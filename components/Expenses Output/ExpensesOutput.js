import {View, StyleSheet, Text} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

export default function ExpensesOutput({expenses, expensesPeriod, fallBackText}) {
  const emptyContent = <Text style={styles.fallbackText}>{fallBackText}</Text>

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
      {expenses.length ? <ExpensesList expenses={expenses}/> : emptyContent}
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
  },
  fallbackText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 32
  }
})