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

class Dashboard extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
  }

  requestLocations = () => {
    const formData = this.formHandler.onSubmitForm();
    formData && this.onSubmit(formData);
  };

  onSubmit = (formData) => {
    const { user } = this.props;

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: user[0].Email,
      keyword: formData.city,
      start: "0",
      limit: "7",
    };

    this.props.request(
      constant.location,
      "post",
      payload,
      USER,
      true,
      (success) => this.onLoginSuccess(success),
      this.onLoginError
    );
  };
  onLoginSuccess = (success) => {
    console.log("success", success);
    push("locations", {
      locations: success.data,
    });
  };

  onLoginError = (error) => {
    if (error) {
      utility.showFlashMessage("Get Location Failed", "danger");
    }
  };

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Header
          centerText="Search"
          onMenuPress={() => utility.openDrawer()}
          rightIcon
          onMenuPress={() => {}}
          onRightPress={() => {}}
          Menu
          Left
        />
        <View style={styles.contentSec}>
          <View style={styles.logoSec}>
            <Image style={styles.imgSec} source={Images.loginLogo} />
          </View>
          <View style={styles.buttonSec}>
            <View style={styles.buttonSec1}>
              <FormHandler ref={(ref) => (this.formHandler = ref)}>
                <TextFieldPlaceholder
                  label="City Or Zipcode"
                  error="City Error"
                  type={INPUT_TYPES.TEXT}
                  identifier="city"
                  blurOnSubmit={false}
                />
                <TextFieldPlaceholder
                  label="Street Address OR Apartment Name"
                  type={INPUT_TYPES.OPTIONAL}
                  identifier="address"
                  blurOnSubmit={false}
                />
              </FormHandler>
            </View>
          </View>
          <View style={styles.submitBtn}>
            <AppTextButton
              title="Search"
              style={styles.btnStyle}
              onPress={() => this.requestLocations()}
            />
          </View>
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
)(Dashboard);
