import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

import * as auth from '../../lib/authHelper';
import { retrieveUser } from '../../redux/actions/userActions';
import { getHouse, getRoomies, updateSocketReady } from '../../redux/actions/houseActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
      isLoggingIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({ isLoggingIn: true });
    auth.login(this.state.usernameInput, this.state.passwordInput, () => {
      this.props.retrieveUser(this.state.usernameInput, ({ houseId }) => {
        if (houseId) {
          this.props.getHouse(houseId, () => {
            this.props.getRoomies(houseId, () => {
              this.props.updateSocketReady(true);
              this.setState({ isLoggingIn: false });
            });
          });
        }
      });
    });
  }

  render() {
    if (!this.state.isLoggingIn) {
      return (
        <View>
          <TextInput
            placeholder="Username"
            onChangeText={usernameInput => this.setState({ usernameInput })}
            value={this.state.usernameInput}
          />
          <TextInput
            placeholder="Password"
            onChangeText={passwordInput => this.setState({ passwordInput })}
            value={this.state.passwordInput}
          />
          <TouchableOpacity onPress={this.handleLogin}>
            <View>
              <Text>Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <MaterialIndicator />;
    }
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveUser: (username, cb) => {
      dispatch(retrieveUser(username, cb));
    },
    getHouse: (houseId, cb) => {
      dispatch(getHouse(houseId, cb));
    },
    getRoomies: (houseId, cb) => {
      dispatch(getRoomies(houseId, cb));
    },
    updateSocketReady: (isReady) => {
      dispatch(updateSocketReady(isReady));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
