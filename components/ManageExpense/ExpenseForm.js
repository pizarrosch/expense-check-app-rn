import {View, StyleSheet, Text} from "react-native";
import Input from "./Input";
import {useState} from "react";

export default function ExpenseForm() {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: ''
  });

  function changeInputHandler(inputIdentifier, enteredValue) {
    setInputValues((current) => {
      return {
        ...current,
        [inputIdentifier]: enteredValue
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.amountAndDateWrapper}>
        <Input
          inputContainerStyle= {styles.rowInputContainer}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: changeInputHandler,
            value: amount
          }}/>
        <Input
          inputContainerStyle= {styles.rowInputContainer}
          label='Date'
          textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: '10',
          onChangeText: () => {
          },
        }}/>
      </View>
      <Input label='Description' textInputConfig={{
        multiline: true,
        // autocorrect: false // default is set to true
        // autocapitalize: 'words' // default is set to 'sentences'
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D3D8DE',
    textAlign: 'center',
    marginBottom: 15
  },
  amountAndDateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInputContainer: {
    flex: 1
  },
})