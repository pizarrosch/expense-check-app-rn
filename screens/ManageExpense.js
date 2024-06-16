import {View, StyleSheet} from 'react-native';
import {useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import Button from '../components/UI/Button';
import {GlobalStyles} from "../constants/styles";

export default function ManageExpense({route, navigation}) {
  const editedExpenseId = route.params?.expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedExpenseId ? 'Edit expense' : 'Add expense'
    })
  }, []);

  function deleteExpenseFunction() {
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{editedExpenseId ? 'Update' : 'Add'}</Button>
      </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 8,
    minWidth: 120
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})