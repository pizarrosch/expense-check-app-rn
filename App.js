import {View, Text, StyleSheet} from 'react-native';
import {StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Recent Expenses" component={RecentExpenses} />
      <BottomTab.Screen name="All Expenses" component={AllExpenses} />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
   <>
    <StatusBar barStyle='default'/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Expenses Overview' component={ExpensesOverview} />
        <Stack.Screen name='Manage Expense' component={ManageExpense} />
      </Stack.Navigator>
    </NavigationContainer>

   </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})