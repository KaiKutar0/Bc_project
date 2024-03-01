import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./src/screens/CameraScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import DocumentationScreen from "./src/screens/DocumentaionScreen";
import "./src/i18n.ts";
import { useTranslation } from "react-i18next";

export default function App() {
  const Tab = createBottomTabNavigator();

  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="LandingScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "LandingScreen") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "SettingsScreen") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "CameraScreen") {
              iconName = focused ? "camera" : "camera-outline";
            } else if (route.name === "DocumentationScreen") {
              iconName = focused ? "document-text" : "document-text-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="DocumentationScreen"
          component={DocumentationScreen}
          options={{
            title: t("documentationTitle"),
          }}
        />
        <Tab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: t("settingsTitle") }}
        />

        <Tab.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ title: t("cameraTitle") }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
