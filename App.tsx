import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnalysisScreen from "./src/screens/AnalysisScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DocumentationScreen from "./src/screens/DocumentaionScreen";
import "./src/i18n.ts";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
            } else if (route.name === "AnalysisScreen") {
              return <MaterialIcons name="science" size={size} color={color} />;
              // iconName = focused ? "text-recognition" : "science";
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
          name="AnalysisScreen"
          component={AnalysisScreen}
          options={{ title: t("analysisTitle") }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
