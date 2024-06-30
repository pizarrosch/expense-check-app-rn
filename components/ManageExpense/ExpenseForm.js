import {View, TextInput} from "react-native";
import Input from "./Input";

export default function ExpenseForm() {

  function changeAmountHandler() {

  }

  return (
    <View>
      <Input label='Amount' textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: changeAmountHandler
      }}/>
      <Input label='Date' textInputConfig={{
        placeholder: 'YYYY-MM-DD',
        maxLength: '10',
        onChangeText: () => {}
      }}/>
      <Input label='Description' textInputConfig={{
        multiline: true,
        // autocorrect: false // default is set to true
        // autocapitalize: 'words' // default is set to 'sentences'
      }}/>
    </View>
  )
}