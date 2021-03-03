import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentSec: {
    backgroundColor: Colors.primary.white,
    height: "100%",
    paddingTop: Metrics.xxDoubleBaseMargin,
    alignItems: "center",
  },
  logoSec: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Metrics.xxDoubleBaseMargin,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: Metrics.doubleBaseMargin,
  },
  btnStyle: {
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.secondary.btnColor,
    color: Colors.primary.white,
    borderRadius: Metrics.doubleBaseMargin,
    // width: "100%",
    fontWeight: "700",
  },
  submitBtn: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: Metrics.xxDoubleBaseMargin + Metrics.baseMargin,
    // marginTop: 30,
  },
  searchContainer: {
    alignItems: "center",
    marginTop: Metrics.xDoubleBaseMargin,
    marginBottom: Metrics.baseMargin,
  },
  itemContainer: {
    alignItems: "center",
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
    borderRadius: Metrics.doubleBaseMargin,
    shadowColor: Colors.xGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  dText: {
    ...AppStyles.gbLight(10, Colors.primary.black),
  },
  itemText: {
    ...AppStyles.gbLight(10, Colors.primary.black),
  },
  myServices: {
    ...AppStyles.gbLight(10, Colors.primary.black),
  },
  columeStyle: {
    marginLeft: Metrics.xDoubleBaseMargin * 2,
    marginTop: Metrics.smallMargin,
  },
  serviceContainer: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.shadow,
    marginTop: Metrics.xDoubleBaseMargin * 4,
  },
  serText: {
    width: 40,
    textAlign: "center",
    ...AppStyles.gbLight(6, Colors.primary.black),
  },
  pickerStyle: {
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    paddingRight: Metrics.smallMargin,
    alignSelf: "center",
    marginRight: Metrics.smallMargin,
  },
  servicesStyle: {
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin + Metrics.xSmallMargin,
    borderRadius: 20,
    backgroundColor: Colors.primary.white,
    alignItems: "center",
    shadowColor: Colors.xGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.smallMargin,
  },
});

export default styles;
