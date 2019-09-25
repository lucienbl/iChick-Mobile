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
    height: 80,
    borderRadius: 14,
    backgroundColor: Colors.PALE_GREY,
    marginRight: 25,
    marginLeft: 25,
    marginTop: 10,
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 20
  },
  messageContainer: {
    alignSelf: 'center',
    marginLeft: 20,
    flexShrink: 1
  },
  title: {
    ...Typography.infoItemTitle
  },
  description: {
    ...Typography.gaugeTitle
  }
});

class Notification extends React.Component {

  render() {
    const { title, description, icon } = this.props;

    return (
      <View style={styles.container}>
        <Icon name={icon} size={40} color={Colors.GREYISH_BROWN_LIGHT} style={styles.icon} />
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    );
  }
}

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Notification;
