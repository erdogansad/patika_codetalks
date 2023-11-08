import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RoomList from './pages/view/RoomList';
import RoomSingle from './pages/view/RoomSingle';
import colors from './styles/colors';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const LogoutButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="exit" size={30} color="orange" />
  </TouchableOpacity>
);

const RoomStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}>
      <Stack.Screen
        options={{
          title: 'Odalar',
          headerRight: () => <LogoutButton onPress={() => auth().signOut()} />,
        }}
        name="RoomList"
        component={RoomList}
      />
      <Stack.Screen name="RoomSingle" component={RoomSingle} />
    </Stack.Navigator>
  );
};

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <RoomStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
