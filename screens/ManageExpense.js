import {View, StyleSheet} from 'react-native';
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../utility/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpense({route, navigation}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedExpenseId ? 'Edit expense' : 'Add expense'
    })
  }, []);

  async function deleteExpenseFunction(expenseData) {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Sorry, your expense could not be deleted');
      setIsSubmitting(false);
    }

  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (editedExpenseId) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  }

  function closeErrorMessage() {
    setError(null);
    setIsSubmitting(false);
    navigation.goBack();
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={closeErrorMessage}/>
  }

  if (isSubmitting) {
    return <LoadingOverlay/>
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