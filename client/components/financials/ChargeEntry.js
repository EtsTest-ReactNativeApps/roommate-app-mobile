import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Avatar,
} from 'react-native-elements';

const styles = {
  card: {
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  balanceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  balance: {
    flex: 1,
    flexDirection: 'column',
    color: 'green',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  roomieName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 2,
    marginLeft: 5,
    flexDirection: 'column',
  },
  charge: {
    flex: 1,
    flexDirection: 'column',
    margin: 2,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
};

const ChargeEntry = ({ charge, deleteCharge }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <Avatar
          small
          rounded
          title={`${charge[0].firstName.slice(0, 1)}${charge[0].lastName.slice(0, 1)}`}
        />
        <Text style={styles.roomieName}>{charge[0].firstName}</Text>
        <View style={styles.balanceContainer}>
          {charge[1] > 0 &&
            <Text style={{ ...styles.balance, ...styles.negative }}>-{charge[1].toFixed(2)}</Text>
          }
          {charge[1] < 0 &&
            <Text style={{ ...styles.balance, ...styles.positive }}>+{charge[1].toFixed(2) * -1}</Text>
          }
          {charge[1] === 0 &&
            <Text>{charge[1].toFixed(2)}</Text>
          }
        </View>
      </View>
      {charge[2].map((roomieOwsUsercharge) => {
        return (
          <View style={styles.header} key={roomieOwsUsercharge.id}>
            <Text style={{ ...styles.charge, ...styles.positive }}>{roomieOwsUsercharge.billText}</Text>
            <Text style={{ ...styles.charge, ...styles.positive }}>{roomieOwsUsercharge.total}</Text>
            <TouchableOpacity onPress={() => deleteCharge(roomieOwsUsercharge.id)}>
              <Text>PAID!</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {charge[3].map((userOwesRoomieCharge) => {
        return (
          <View style={styles.header} key={userOwesRoomieCharge.id}>
            <Text style={{ ...styles.charge, ...styles.negative }}>{userOwesRoomieCharge.billText}</Text>
            <Text style={{ ...styles.charge, ...styles.positive }}>{userOwesRoomieCharge.total}</Text>
            <TouchableOpacity onPress={() => deleteCharge(userOwesRoomieCharge.id)}>
              <Text>PAID!</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </Card>
  );
};

export default ChargeEntry;