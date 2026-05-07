"use no memo";

import { currentDate, options } from "@/utils/date-helpers";
import { FlexWidget, TextWidget } from "react-native-android-widget";

export default function TestWidget() {
  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
      }}
      accessibilityLabel="Test widget"
    >
      <TextWidget
        text={currentDate.toLocaleString("ar-EG", {
          calendar: "islamic",
          month: "long",
        })}
        style={{
          fontSize: 16,
          fontFamily: "Roboto",
          color: "#000000",
        }}
      />

      <TextWidget
        text={currentDate.toLocaleString("fr-FR", options)}
        style={{
          fontSize: 20,
          fontFamily: "Roboto",
          color: "#000000",
        }}
      />
    </FlexWidget>
  );
}
