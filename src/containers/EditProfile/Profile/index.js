import React, {Component, useContext} from 'react';
import {
  View,
  Image,
  ScrollView,
  Picker,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  Button,
  Settings,
  Alert
} from 'react-native';
import {USER, DUMP, DELETE_ALL} from '../../../actions/ActionTypes';
import constant from '../../../constants';
import utility from '../../../utility';
import {NavigationContext} from '@react-navigation/native';
import {push} from '../../../services/NavigationService';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import singleton from "../../../singleton";
import {
  TextFieldPlaceholder,
  FormHandler,
  TextfieldNoPlaceholder,
  AppTextButton,
  AppTabButton,
  Header,
  AddProfileItem,
  BottomActionSheet,
  Avatar,
} from '../../../reuseableComponents';
import {
  TopHeader,
  TopBanner,
  InputField,
  LoaderComp,
} from '../../../components';
import {request, success} from '../../../actions/ServiceAction';
import {
  selectCameraImage,
  selectSingleImage,
} from '../../../services/PickerUtiles';
import {INPUT_TYPES} from '../../../reuseableComponents/FormHandler/Constants';
import HttpServiceManager from '../../../services/HttpServiceManager';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {Images, Colors, AppStyles, Metrics} from '../../../theme';
import {WithKeyboardListener} from '../../../HOC';
import {logout, generalUpdate} from '../../../actions/ServiceAction';
import { LoginContext } from "../../../../src";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.user && props.user.display_picture_base64,
      display_picture: props.user && props.user.display_picture_url,
      isFetching: false,
      is_visible: true,
      c_visible: true,
      activeTab: 'Settings'
    };
  }
  static contextType = LoginContext;

  cbOnUpdateProfileRequest = () => {
    const formData = this.formHandler.onSubmitForm();
    formData && this.onSubmit(formData);
  };

  onSubmit = (formData) => {
    const {avatar, display_picture, isFetching} = this.state;
    const {user} = this.props;

    let payload = {
      token: 'U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT',
      user_id: user.id,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmpassword: formData.confirmPassword,
    };

    this.props.request(
      constant.updateProfile,
      'post',
      payload,
      DUMP,
      true,
      (success) => this.onProfileUpdateSuccess(success),
      this.onSignUpError,
    );
  };

  onProfileUpdateSuccess = (success) => {
    utility.showFlashMessage('Profile Updated Successfully!', 'success');
  };

  onTabSelect = (tabVal) => {
    const { activeTab } = this.state;
    this.setState({activeTab: tabVal})
  }

  onLogout = () => {
    singleton.storeRef.dispatch(logout());
    singleton.storeRef.dispatch(generalUpdate(DELETE_ALL, []));
    this.context.setLogin(false);
  }

  render() {
    const {user, navigation} = this.props;
    const {avatar, display_picture, isFetching, activeTab} = this.state;
    return (
      <>
        <View style={styles.tabsSection}>
          <View style={styles.tabBtnSec}>
            <AppTabButton
              title="Profile"
              style={[styles.tabButton, activeTab && activeTab == "Profile" ? styles.activeTab: styles.notActiveTab]}
              onPress={() => this.onTabSelect('Profile')}
            />
          </View>
          <View style={styles.tabBtnSec}>
            <AppTabButton
              title="Settings"
              style={[styles.tabButton, activeTab && activeTab == "Settings" ? styles.activeTab: styles.notActiveTab]}
              onPress={() => this.onTabSelect('Settings')}
            />
          </View>
        </View>
        {activeTab == 'Profile' && <ScrollView
          // style={{flex: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{flexGrow: 1}}
          >
          {/*isFetching && <LoaderComp />*/}

          <View style={styles.buttonSec}>
            <View style={styles.profilePicSec}>
              <Image source={Images.avatarIcon} style={styles.profilePic} />
            </View>
            <View style={styles.formStyle}>
              <FormHandler ref={(ref) => (this.formHandler = ref)}>
                <View style={styles.inputFieldSec}>
                  <Text style={styles.label}>First Name</Text>
                  <TextfieldNoPlaceholder
                    error="First name is required"
                    type={INPUT_TYPES.OPTIONAL}
                    style={styles.simpleInpt}
                    identifier="firstName"
                    blurOnSubmit={false}
                    //rightIcon={Images.ic_pass}
                    value={user && user.first_name}
                  />
                </View>
                <View style={styles.inputFieldSec}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextfieldNoPlaceholder
                    label="Last Name"
                    type={INPUT_TYPES.OPTIONAL}
                    style={styles.simpleInpt}
                    identifier="lastName"
                    blurOnSubmit={false}
                    //rightIcon={Images.ic_pass}
                    value={user && user.last_name}
                  />
                </View>
                <View style={styles.inputFieldSec}>
                  <Text style={styles.label}>Email</Text>
                  <TextfieldNoPlaceholder
                    label="Email"
                    type={INPUT_TYPES.OPTIONAL}
                    identifier="email"
                    style={styles.simpleInpt}
                    blurOnSubmit={false}
                    value={user && user.email}
                  />
                </View>
                <View style={styles.inputFieldSec}>
                  <Text style={styles.label}>Mobile</Text>
                  <TextfieldNoPlaceholder
                   label="Mobile"
                   error="Mobile number is required"
                   type={INPUT_TYPES.PHONE}
                   style={styles.simpleInpt}
                   identifier="phone"
                   blurOnSubmit={false}
                   value={user && user.phone}
                  />
                </View>
                <View style={styles.inputFieldSec}>
                  <Text style={styles.label}>Street</Text>
                  <TextfieldNoPlaceholder
                    label="Street Name"
                    type={INPUT_TYPES.OPTIONAL}
                    style={styles.simpleInpt}
                    identifier="street"
                    blurOnSubmit={false}
                    value={user && user.street_name}
                  />
                </View>
                <View style={styles.inputFieldSec}>
                  <Text style={styles.label}>City</Text>
                  <TextfieldNoPlaceholder
                    label="City"
                    type={INPUT_TYPES.OPTIONAL}
                    style={styles.simpleInpt}
                    identifier="city"
                    blurOnSubmit={false}
                    //rightIcon={Images.ic_pass}
                    value={user && user.city}
                  />
                </View>
                <View style={styles.inputFieldSec}>
                  <Text style={styles.label}>Zipcode</Text>
                  <TextfieldNoPlaceholder
                    label="Zip"
                    type={INPUT_TYPES.OPTIONAL}
                    style={styles.simpleInpt}
                    identifier="zipcode"
                    blurOnSubmit={false}
                    value={user && user.zipcode}
                  />
                </View>
              </FormHandler>
            </View>

            <View style={styles.submitBtn}>
              <AppTextButton title="Save" style={styles.btnStyle} />
            </View>
          </View>
        </ScrollView>}
        {activeTab == "Settings" && <View style={styles.settingsSec}>
        <TextFieldPlaceholder
            label="Licence"
            type={INPUT_TYPES.OPTIONAL}
            identifier="Licence"
            editable={false}
            value={user && user.licence}
          />
          <View style={styles.logoutSec}>
          <TouchableOpacity onPress={this.onLogout}>
              <View style={styles.logoutSecBtn}>
               
                <Image style={styles.logoutIcon} source={Images.m_logout_white} />
                <Text style={styles.logoutTxt}>Logout</Text>
               
                </View>
                </TouchableOpacity>
              {/* <AppTextButton title="Logout" style={styles.btnStyle} /> */}
          </View>
        </View>  
        }
      </>
    );
  }
}

const actions = {request, success};
const mapStateToProps = ({user}) => ({user: user.data});
export default connect(mapStateToProps, actions)(WithKeyboardListener(Profile));
