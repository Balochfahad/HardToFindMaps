import { StyleSheet } from "react-native";
import { Colors, AppStyles, Metrics } from "../../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  topNav: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
  },
  formStyle: {
    alignItems: "center",
  },
  titleIcon: {
    fontSize: 38,
    color: "#f39B89",
  },
  titleWithIcon: {
    flexDirection: "row",
    marginRight: 20,
    marginBottom: 40,
  },
  topHeaderText: {
    fontSize: 16,
  },
  headerTitleSec: {
    flex: 1,
    alignItems: "center",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    opacity: 0.75,
    position: "absolute",
    zIndex: 100,
    width: "100%",
    height: "100%",
  },
  dropDown: {
    width: 300,
    borderRadius: 40,
    backgroundColor: "#eee",
    borderColor: "#eee",
    paddingHorizontal: 20,
  },
  imgSec: {
    height: 200,
    width: "100%",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Metrics.doubleBaseMargin,
    marginTop: Metrics.doubleBaseMargin,
  },
  buttonSec: {
    backgroundColor: "#fff",
    position: "relative",
    top: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 15,
    paddingTop: Metrics.xxxDoubleBaseMargin,
    height: "100%",
  },
  textSec: {
    ...AppStyles.gbLight(20, Colors.primary.black),
    marginLeft: 60,
    marginBottom: 30,
  },
  btnStyle: {
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.secondary.btnColor,
    color: Colors.primary.white,
    borderRadius: Metrics.xxDoubleBaseMargin,
    fontWeight: "700",
  },
  button1: {
    width: 200,
    borderRadius: 20,
  },
  button2: {
    width: 200,
    paddingHorizontal: 10,
    textAlign: "center",
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 15,
    borderColor: "#fa9572",
    backgroundColor: "#fff",
    fontWeight: "400",
    borderWidth: 1,
    color: "#000",
  },
  button3: {
    width: 300,
    flexDirection: "row",
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#eee",
    borderColor: "#eee",
    paddingHorizontal: 22,
    paddingVertical: 15,
    marginVertical: 10,
  },
  btnText: {
    flex: 1,
    color: "#777",
  },
  btnIcon: {
    marginTop: 2,
    color: "#777",
  },
  input: {
    width: 300,
    borderRadius: 20,
    backgroundColor: "#eee",
    borderColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icons: {
    fontSize: 15,
  },
  inputSec: {
    marginBottom: 20,
    alignItems: "center",
  },
  buttonSec1: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  buttonSec2: {
    alignItems: "center",
    // color: '#000000',
  },
});

export default styles;
