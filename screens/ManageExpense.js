import {View, StyleSheet} from 'react-native';
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {storeExpense} from "../utility/http";

export default function ManageExpense({route, navigation}) {
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedExpenseId ? 'Edit expense' : 'Add expense'
    })
  }, []);

  function deleteExpenseFunction() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (editedExpenseId) {
      expenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      storeExpense(expenseData);
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={editedExpenseId ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />
      {editedExpenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={28}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseFunction}
          />
        </View>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})