// default expo router app entry file content

import "@expo/metro-runtime";

import { App } from "expo-router/build/qualified-entry";
import { renderRootComponent } from "expo-router/build/renderRootComponent";

// react native widget addition
import {
  // registerWidgetConfigurationScreen,
  registerWidgetTaskHandler,
} from "react-native-android-widget";
import { widgetTaskHandler } from "./widgets-config/widget-task-handler";
// import { WidgetConfigurationScreen } from "./widgets-config/widget-configuration-screen";

renderRootComponent(App);
registerWidgetTaskHandler(widgetTaskHandler);
// registerWidgetConfigurationScreen(WidgetConfigurationScreen);
