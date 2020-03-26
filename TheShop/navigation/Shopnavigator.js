import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ProductsNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="All Products"
        component={ProductOverviewScreen}
        options={route => ({
          headerTintColor: Colors.primary,
          headerStyle: { fontFamily: 'OpenSans-Bold' },
          headerLeft: () => (
            <Icon.Button
              name="bars"
              size={23}
              backgroundColor="white"
              color={Colors.primary}
              marginLeft={10}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerRight: () => (
            <Icon.Button
              name="shopping-cart"
              size={23}
              backgroundColor="white"
              color={Colors.primary}
              onPress={() => route.navigation.navigate('CartScreen')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.productTitle,
          headerStyle: { fontFamily: 'OpenSans-Bold' },
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Your Cart',
          headerTintColor: Colors.primary,
        }}
      />
    </Stack.Navigator>
  );
}

function OrderNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          title: 'Orders',
          headerTintColor: Colors.primary,
          headerLeft: () => (
            <Icon.Button
              name="bars"
              size={23}
              backgroundColor="white"
              color={Colors.primary}
              marginLeft={10}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function AdminNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProductScreen"
        component={UserProductScreen}
        options={route => ({
          title: 'Admin',
          headerTintColor: Colors.primary,
          headerLeft: () => (
            <Icon.Button
              name="bars"
              size={23}
              backgroundColor="white"
              color={Colors.primary}
              marginLeft={10}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerRight: () => (
            <Icon.Button
              name="edit"
              size={23}
              backgroundColor="white"
              color={Colors.primary}
              onPress={() =>
                route.navigation.navigate('EditProductScreen', {
                  productId: null,
                })
              }
            />
          ),
        })}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={route => ({
          title: route.route.params.productId ? 'Edit Product' : 'Add Product',
          headerTintColor: Colors.primary,
          headerRight: () => (
            <Icon.Button
              name="check"
              size={23}
              backgroundColor="white"
              color={Colors.primary}
              onPress={() => route.route.params.submit()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function ShopNavigator({ navigation }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{ activeTintColor: Colors.primary }}
      >
        <Drawer.Screen
          name="Products"
          component={ProductsNavigator}
          options={{
            drawerIcon: drawerConfig => (
              <Icon
                name="shopping-cart"
                size={16}
                color={drawerConfig.tintColor}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="OrdersScreen"
          component={OrderNavigator}
          options={{
            drawerIcon: drawerConfig => (
              <Icon name="bars" size={16} color={drawerConfig.tintColor} />
            ),
            title: 'Orders',
          }}
        />
        <Drawer.Screen
          name="AdminNavigator"
          component={AdminNavigator}
          options={route => ({
            drawerIcon: drawerConfig => (
              <Icon name="user" size={16} color={drawerConfig.tintColor} />
            ),
            title: 'Admin',
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigator;
