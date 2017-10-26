import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HouseNavBack from '../HouseNavBack';
import ChargeList from './ChargeList';
import { getAllCharges } from '../../redux/actions/financialActions';


class ChargesView extends Component {
  constructor(props) {
    super(props);

    this.getCharges = this.getCharges.bind(this);
  }
  componentWillMount() {
    this.getCharges();
  }
  getCharges() {
    this.props.getAllCharges(this.props.houseId, this.props.roomies, this.props.userId);
  }
  render() {
    return (
      <View>
        <Text>{typeof this.props.formattedCharges}</Text>
        {<ChargeList charges={this.props.formattedCharges} />}
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    roomies: store.house.roomies,
    houseId: store.user.houseId,
    userId: store.user.id,
    charges: store.financial.charges,
    formattedCharges: store.financial.formattedCharges,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCharges: (id, roomies, userId, cb) => {
      dispatch(getAllCharges(id, roomies, userId, cb));
    },
  };
};

const ChargesViewRedux = connect(mapStateToProps, mapDispatchToProps)(ChargesView);

const Charges = StackNavigator({
  Charges: {
    screen: ChargesViewRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'Charges',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default Charges;
