import React, {Component} from 'react';
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
} from 'react-native';
import {USER, DUMP} from '../../../actions/ActionTypes';
import constant from '../../../constants';
import utility from '../../../utility';
import {NavigationContext} from '@react-navigation/native';
import {push} from '../../../services/NavigationService';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {
  TextFieldPlaceholder,
  FormHandler,
  AppTextButton,
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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.user && props.user.display_picture_base64,
      display_picture: props.user && props.user.display_picture_url,
      isFetching: false,
      is_visible: true,
      c_visible: true,
    };
  }

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

  render() {
    const {user} = this.props;
    const {avatar, display_picture, isFetching} = this.state;
    // console.log("avatar", avatar);
    return (
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {/*isFetching && <LoaderComp />*/}

        <View style={styles.buttonSec}>
          <View style={styles.formStyle}>
            <FormHandler ref={(ref) => (this.formHandler = ref)}>
              <TextFieldPlaceholder
                label="First Name"
                error="First name is required"
                type={INPUT_TYPES.TEXT}
                identifier="name"
                blurOnSubmit={false}
                //rightIcon={Images.ic_pass}
                value={user && user.first_name}
              />
              <TextFieldPlaceholder
                label="Email"
                error="Email is required"
                type={INPUT_TYPES.EMAIL}
                identifier="email"
                blurOnSubmit={false}
                value={user && user.email}
                //rightIcon={Images.ic_pass}
              />
              <TextFieldPlaceholder
                label="Password"
                error="Password is required"
                type={INPUT_TYPES.PASSWORD}
                showPassword={this.state.is_visible ? false : true}
                identifier="password"
                onRightPress={() =>
                  this.setState({
                    is_visible: !this.state.is_visible,
                  })
                }
                rightIcon={
                  this.state.is_visible ? Images.ic_invisible : Images.ic_pass
                }
              />
              <TextFieldPlaceholder
                label="Confirm Password"
                showPassword={this.state.c_visible ? false : true}
                error="Password & Confirm password should be same"
                type={INPUT_TYPES.CONFIRM_PASSWORD}
                identifier="confirmPassword"
                blurOnSubmit={false}
                onRightPress={() =>
                  this.setState({
                    c_visible: !this.state.c_visible,
                  })
                }
                rightIcon={
                  this.state.c_visible ? Images.ic_invisible : Images.ic_pass
                }
              />
            </FormHandler>
          </View>

          <View style={styles.submitBtn}>
            <AppTextButton title="Save" style={styles.btnStyle} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const actions = {request, success};
const mapStateToProps = ({user}) => ({user: user.data});
export default connect(mapStateToProps, actions)(WithKeyboardListener(Profile));
