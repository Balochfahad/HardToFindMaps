import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Picker,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  FlatList,
} from "react-native";
import { USER, DUMP, RECENT_SERVICES_LIST } from "../../actions/ActionTypes";
import { EventBusSingleton } from "light-event-bus";
import constant from "../../constants";
import utility from "../../utility";
import { push, pop } from "../../services/NavigationService";
import { connect } from "react-redux";
import { request } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../services/HttpServiceManager";
import { NavigationContext } from "@react-navigation/native";
import { WithKeyboardListener } from "../../HOC";
import {
  Header,
  AppTextButton,
  Avatar,
  FormHandler,
  TextFieldPlaceholder,
} from "../../reuseableComponents";
import styles from "./styles";
import { Images, Metrics, Colors, AppStyles } from "../../theme";


class History extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      recentService: [],
    };
  }

  onListSuccess = (success) => {
    this.setState({ recentService: success.data });
  };
  onListError = (error) => {
    // console.log("error", error);
  };

  render() {
    const { user } = this.props;
    const { recentService } = this.state;

    return (
      <View style={styles.container}>
        <Header
          centerText="History"
          onMenuPress={() => utility.openDrawer()}
          rightIcon
          onMenuPress={() => {}}
          onRightPress={() => {}}
          Menu
          Left
        />
        <View style={styles.contentSec}>
          <View style={styles.historyItemSec}>
            <Text style={styles.historyItemTitle}>New York</Text>
            <Text style={styles.historyItemDesc}>Lorem Ipsum Dolar Ipsum</Text>
          </View>
          <View style={styles.historyItemSec}>
            <Text style={styles.historyItemTitle}>Chicago</Text>
            <Text style={styles.historyItemDesc}>Lorem Ipsum Dolar Ipsum</Text>
          </View>
          <View style={styles.historyItemSec}>
            <Text style={styles.historyItemTitle}>California</Text>
            <Text style={styles.historyItemDesc}>Lorem Ipsum Dolar Ipsum</Text>
          </View>
        </View>
      </View>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user, recentServices }) => ({
  user: user.data,
  recentServices: recentServices.data,
});
export default connect(
  mapStateToProps,
  actions
)(History);
