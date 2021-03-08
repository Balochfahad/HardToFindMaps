import React, {Component} from 'react';
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
} from 'react-native';
import {USER, DUMP, RECENT_SERVICES_LIST} from '../../../actions/ActionTypes';
import constant from '../../../constants';
import utility from '../../../utility';
import {push, pop} from '../../../services/NavigationService';
import {connect} from 'react-redux';
import {request} from '../../../actions/ServiceAction';
import {INPUT_TYPES} from '../../../reuseableComponents/FormHandler/Constants';
import HttpServiceManager from '../../../services/HttpServiceManager';
import {NavigationContext} from '@react-navigation/native';
import {WithKeyboardListener} from '../../../HOC';
import {
  Header,
  AppTextButton,
  Avatar,
  FormHandler,
  TextFieldPlaceholder,
} from '../../../reuseableComponents';
import styles from './styles';
import {Images, Metrics, Colors, AppStyles} from '../../../theme';

class LocationDetail extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      detail: [],
    };
  }

  componentDidMount() {
    const {route} = this.props;
    const detail = route.params.detail;
    this.setState({detail: detail});
    // Id && this.onMerchantQuoteDetailRequest(Id);
  }

  render() {
    const {user} = this.props;
    const {detail} = this.state;
    const img_url = `${constant.baseURL}/${detail.Image}`;
    console.log('img_url', img_url);
    return (
      <View style={styles.container}>
        <Header
          centerText="Details"
          onMenuPress={() => utility.openDrawer()}
          rightIcon
          onMenuPress={() => {}}
          onRightPress={() => {}}
          Menu
          Left
        />
        <View style={styles.contentSec}>
          {detail ? (
            <View>
              <View style={styles.mgHorizontal}>
                <Text style={styles.title}>{detail.Apartment}</Text>
              </View>
              <View style={styles.mgHorizontal}>
                <Text style={styles.address}>
                  {detail.StreetAddress},{detail.City} {detail.State}{' '}
                  {detail.ZipCode} {detail.Country}
                </Text>
              </View>
              <View style={styles.mgHorizontal}>
                <Text>
                  Contact: <Text style={styles.linkTxt}>{detail.PhoneNo}</Text>
                </Text>
                <Text>
                  Website:{' '}
                  <Text style={styles.linkTxt}>{detail.LinkToWebsite}</Text>
                </Text>
              </View>
              <View style={styles.imgSec}>
                <Image style={styles.mapImg} source={{uri: img_url}} />
              </View>
            </View>
          ) : (
            <Text>No Detail Found</Text>
          )}
        </View>
      </View>
    );
  }
}

const actions = {request};
const mapStateToProps = ({user}) => ({
  user: user.data,
});
export default connect(mapStateToProps, actions)(LocationDetail);
