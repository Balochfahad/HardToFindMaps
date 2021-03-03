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
import { USER, DUMP, RECENT_SERVICES_LIST } from "../../../actions/ActionTypes";
import { EventBusSingleton } from "light-event-bus";
import constant from "../../../constants";
import utility from "../../../utility";
import { push, pop } from "../../../services/NavigationService";
import { connect } from "react-redux";
import { request } from "../../../actions/ServiceAction";
import { INPUT_TYPES } from "../../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../../services/HttpServiceManager";
import { NavigationContext } from "@react-navigation/native";
import { WithKeyboardListener } from "../../../HOC";
import {
  Header,
  AppTextButton,
  Avatar,
  FormHandler,
  TextFieldPlaceholder,
} from "../../../reuseableComponents";
import styles from "./styles";
import { Images, Metrics, Colors, AppStyles } from "../../../theme";

class LocationList extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const locations = route.params.locations;
    this.setState({ list: locations });
    // Id && this.onMerchantQuoteDetailRequest(Id);
  }

  render() {
    const { user } = this.props;
    const { list } = this.state;

    return (
      <View style={styles.container}>
        <Header
          centerText="Locations"
          onMenuPress={() => utility.openDrawer()}
          rightIcon
          onMenuPress={() => {}}
          onRightPress={() => {}}
          Menu
          Left
        />
        <View style={styles.contentSec}>
          {list.length ? (
            list.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    push("locationDetail", {
                      detail: item,
                    })
                  }
                >
                  <View style={styles.historyItemSec}>
                    <Text style={styles.historyItemTitle}>
                      {item.Apartment}
                    </Text>
                    <Text style={styles.historyItemDesc}>
                      {item.StreetAddress}, {item.City}, {item.State}{" "}
                      {item.ZipCode}
                      {item.Country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>"No Location Found"</Text>
          )}
        </View>
      </View>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user }) => ({
  user: user.data,
});
export default connect(
  mapStateToProps,
  actions
)(LocationList);
