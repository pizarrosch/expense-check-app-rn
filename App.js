import {StyleSheet} from 'react-native';
import {StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import {GlobalStyles} from "./constants/styles";
import {Ionicons} from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator screenOptions={({navigation}) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => <IconButton
        icon='add'
        size={28}
        color={tintColor}
        onPress={() => navigation.navigate('ManageExpense')}
      />
    })}>
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => <Ionicons size={size} color={color} name='hourglass'/>
        }}
      />
      <BottomTab.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          title: 'All expenses',
          tabBarLabel: 'All expenses',
          tabBarIcon: ({color, size}) => <Ionicons size={size} color={color} name='calendar'/>
        }}
      />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
   <>
    <StatusBar barStyle='default'/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Expenses Overview'
          component={ExpensesOverview}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name='ManageExpense' component={ManageExpense} options={{headerBackTitle: 'Back'}}/>
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