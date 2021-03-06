import { StyleSheet } from "react-native";
import { Colors } from "../../theme";

export const hairlineWidth = StyleSheet.hairlineWidth;
const defaultStyles = (isAnonymityActive = false) => {
  return {
    overlay: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.4,
      backgroundColor: "#000",
    },
    wrapper: {
      flex: 1,
      flexDirection: "row",
    },
    body: {
      flex: 1,
      alignSelf: "flex-end",
      backgroundColor: "#e5e5e5",
      marginBottom: 12,
    },
    titleBox: {
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    titleText: {
      color: "#757575",
      fontSize: 14,
    },
    messageBox: {
      height: 30,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    messageText: {
      color: "#9a9a9a",
      fontSize: 12,
    },
    buttonBox: {
      height: 50,
      marginTop: hairlineWidth,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.primary.white,
    },
    buttonText: {
      fontSize: 18,
    },
    cancelButtonBox: {
      height: 50,
      marginTop: 0.8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.primary.white,
    },
  };
};

export default defaultStyles;
