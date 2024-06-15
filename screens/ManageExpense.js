import {Text} from 'react-native';
import {useLayoutEffect} from "react";

export default function ManageExpense({route, navigation}) {
  const editedExpenseId = route.params?.expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedExpenseId ? 'Edit expense' : 'Add expense'
    })
  }, []);

  return <Text>{editedExpenseId ? 'Edit expense' : 'Add expense'}</Text>
}