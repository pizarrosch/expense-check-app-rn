import {View, StyleSheet, Text} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../utility/date";
import {GlobalStyles} from "../../constants/styles";

export default function ExpenseForm({onSubmit, onCancel, submitButtonLabel, defaultValues}) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    }
  });

  function changeInputHandler(inputIdentifier, enteredValue) {
    setInputValues((current) => {
      return {
        ...current,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true
        }
      }
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount?.value?.replace(',', '.'),
      date: new Date(inputValues.date.value),
      description: inputValues.description.value
    };
    if(inputValues.date.value === '') {
      expenseData.date = new Date();
    }
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const descriptionIsValid = expenseData.description?.trim().length > 0;
    const dateIsValid = getFormattedDate(expenseData.date) === inputValues.date.value;
    const invalidTitle = !amountIsValid ? 'amount' : !dateIsValid ? 'date' : !descriptionIsValid ? 'description' : '';

    if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
      // Alert.alert(`${invalidTitle.toLocaleUpperCase()} is invalid`, 'Please improve the typed data', [{style: 'destructive'}]);
      setInputValues(current => {
        return {
          amount: {value: current.amount.value, isValid: amountIsValid},
          date: {value: current.date.value, isValid: dateIsValid},
          description: {value: current.description.value, isValid: descriptionIsValid}
        }
      })
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.amountAndDateWrapper}>
        <Input
          inputContainerStyle={styles.rowInputContainer}
          inputIsValid={inputValues.amount.isValid}
          // inputStyle={!inputValues.date.isValid && styles.inputError}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: changeInputHandler.bind(this, 'amount'),
            value: inputValues.amount.value
          }}/>
        <Input
          inputContainerStyle={styles.rowInputContainer}
          // inputStyle={!inputValues.date.isValid && styles.inputError}
          inputIsValid={inputValues.date.isValid}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: '10',
            onChangeText: changeInputHandler.bind(this, 'date'),
            value: inputValues.date.value
          }}/>
      </View>
      <Input
        label='Description'
        textInputConfig={{
        multiline: true,
        onChangeText: changeInputHandler.bind(this, 'description'),
        value: inputValues.description.value
        // autocorrect: false // default is set to true
        // autocapitalize: 'words' // default is set to 'sentences'
      }}
        inputIsValid={inputValues.description.isValid}
      />
      {formIsInvalid && <Text style={styles.errorText}>At least one of the filled data is invalid. Please improve the typed data!</Text>}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 8,
    minWidth: 120
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  }
})