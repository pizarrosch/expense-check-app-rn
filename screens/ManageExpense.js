import {View, StyleSheet} from 'react-native';
import {useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";

export default function ManageExpense({route, navigation}) {
  const editedExpenseId = route.params?.expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedExpenseId ? 'Edit expense' : 'Add expense'
    })
  }, []);

  function deleteExpenseFunction() {
  }

  return (
    <View style={styles.container}>
      {editedExpenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={36}
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