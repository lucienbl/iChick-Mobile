/*
 * Copyright (c) 2019 Lucien Blunk-Lallet
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import {Colors, Typography} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: Colors.PALE_GREY,
    marginTop: 40,
    paddingLeft: 25,
    paddingBottom: 25,
    paddingRight: 60
  },
  title: {
    marginTop: 15,
    ...Typography.infoTitle,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  temperatureTitle: {
    ...Typography.temperature
  },
  sensorInfoContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  sensorInfoTitle: {
    ...Typography.infoItemTitle,
    marginLeft: 20
  }
});

class Information extends React.Component {

  render() {
    const { temperature, icon, lux, humidity } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Information</Text>

        <View style={styles.weatherContainer}>
          <Text style={styles.temperatureTitle}>{temperature}°C</Text>
          <Icon name={icon} size={60} color={Colors.GREYISH_BROWN_LIGHT} />
        </View>

        <View style={styles.sensorInfoContainer}>
          <Icon name="ios-moon" size={30} color={Colors.PALE_ORANGE} />
          <Text style={[styles.sensorInfoTitle, { color: Colors.PALE_ORANGE }]}>{lux} LUX</Text>
        </View>

        <View style={styles.sensorInfoContainer}>
          <Icon name="ios-water" size={30} color={Colors.CORNFLOWER_BLUE} />
          <Text style={[styles.sensorInfoTitle, { color: Colors.CORNFLOWER_BLUE }]}>{humidity}%</Text>
        </View>
      </View>
    );
  }
}

Information.propTypes = {
  temperature: PropTypes.number.isRequired,
  lux: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired
};

export default Information;
