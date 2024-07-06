import {View, Text, TextInput, StyleSheet} from 'react-native';
import {GlobalStyles} from "../../constants/styles";

export default function Input({label, textInputConfig, inputContainerStyle, inputIsValid}) {

  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, inputContainerStyle]}>
      <Text style={inputIsValid ? styles.label : [styles.label, styles.labelErrorState]}>{label}</Text>
      <TextInput {...textInputConfig} style={inputIsValid ? inputStyles : [inputStyles, styles.inputError]}/>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    backgroundColor: GlobalStyles.colors.error50
  },
  labelErrorState: {
    color: GlobalStyles.colors.error500
  }
})