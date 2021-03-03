import React, { Component } from "react";
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
  ImageBackground,
} from "react-native";
import { USER, DUMP } from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { NavigationContext } from "@react-navigation/native";
import { push } from "../../services/NavigationService";
import { LoginContext } from "../../";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import { connect } from "react-redux";
import {
  TextFieldPlaceholder,
  FormHandler,
  AppTextButton,
} from "../../reuseableComponents";
import { request } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../services/HttpServiceManager";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { Images, Colors, AppStyles } from "../../theme";
import { WithKeyboardListener } from "../../HOC";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";

class Login extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      is_visible: true,
    };
  }

  componentDidMount() {}
  safeAreaBottomInset = 0;

  cbOnRequestLogin = (setLogin, setRole) => {
    const formData = this.formHandler.onSubmitForm();
    formData && this.onSubmit(formData, setLogin, setRole);
  };

  onSubmit = (formData, setLogin, setRole) => {
    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: formData.email,
      password: formData.password,
    };

    this.props.request(
      constant.login,
      "post",
      payload,
      USER,
      true,
      (success) => this.onLoginSuccess(setLogin, setRole, success),
      this.onLoginError
    );
  };
  onLoginSuccess = (setLogin, setRole, success) => {
    console.log("success", success);
    // HttpServiceManager.getInstance().userToken = success.data.token;
    setRole(success.data[0].Role);
    setLogin();
  };
  onLoginError = (error) => {
    if (error) {
      utility.showFlashMessage("Login Failed", "danger");
    }
  };

  getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log("login info has error: " + error);
        } else {
          this.setState({ userInfo: user });
          console.log("result:", user);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  signInFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  };

  render() {
    const { is_visible } = this.state;
    const { isKeyboardVisible, keyboardHeight, route } = this.props;
    // console.log("secureTextEntry", is_visible, is_Role);
    return (
      <LoginContext.Consumer>
        {({ isLogin, setLogin, setRole }) => {
          return (
            <View
              style={[
                styles.container,
                {
                  marginBottom: isKeyboardVisible
                    ? utility.isPlatformAndroid()
                      ? 0
                      : keyboardHeight
                    : 0,
                },
              ]}
            >
              <ImageBackground
                source={Images.loginBg}
                style={styles.image}
                resizeMode="cover"
              >
                <View style={styles.overlay}>
                  <View>
                    <View style={styles.logoSec}>
                      <Image style={styles.imgSec} source={Images.loginLogo} />
                      {/*<Text style={styles.topError}>
                      Incorrect username or password.
                    </Text>*/}
                    </View>
                    <View style={styles.buttonSec}>
                      <View style={styles.buttonSec1}>
                        <FormHandler ref={(ref) => (this.formHandler = ref)}>
                          <TextFieldPlaceholder
                            label="Email Address"
                            error="Invalid email format"
                            type={INPUT_TYPES.EMAIL}
                            identifier="email"
                            blurOnSubmit={false}
                          />
                          <TextFieldPlaceholder
                            label="Password"
                            error="Invalid password format"
                            type={INPUT_TYPES.PASSWORD}
                            showPassword={this.state.is_visible ? false : true}
                            identifier="password"
                            onRightPress={() =>
                              this.setState({
                                is_visible: !this.state.is_visible,
                              })
                            }
                            rightIcon={
                              this.state.is_visible
                                ? Images.ic_invisible
                                : Images.ic_pass
                            }
                          />
                        </FormHandler>
                      </View>
                    </View>
                  </View>
                  <View style={styles.submitBtn}>
                    <AppTextButton
                      title="LOGIN"
                      style={styles.btnStyle}
                      onPress={() => this.cbOnRequestLogin(setLogin, setRole)}
                    />
                    <AppTextButton
                      onPress={this.signInFacebook}
                      style={styles.fbButton}
                      title="FACEBOOK"
                    />
                  </View>
                  <View style={styles.txtSec}>
                    <Text style={styles.separatorTxt}>Or</Text>
                  </View>
                  <View style={styles.buttonSec2}>
                    <TouchableOpacity
                      style={styles.btnTxt}
                      onPress={() => push("register")}
                    >
                      <Text style={styles.text}>Create New Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

const actions = { request };
const mapStateToProps = ({}) => ({});
export default connect(
  mapStateToProps,
  actions
)(WithKeyboardListener(Login));
