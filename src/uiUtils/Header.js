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
import { StyleSheet, View, Text, Animated, Easing, PanResponder, Dimensions, ScrollView } from "react-native";
import PropTypes from "prop-types";
import {Colors, Typography} from '../styles';
import {strings} from '../localization';
import LinearGradient from 'react-native-linear-gradient';
import {Config} from '../config';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    elevation: 14,
    shadowColor: "#777",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.WHITE,
    paddingTop: 25,
    minHeight: 200,
    zIndex: 999
  },
  title: {
    ...Typography.headlineBlack
  },
  gaugeTitle: {
    ...Typography.gaugeTitle
  },
  gaugeContainer: {
    width: '100%',
    height: 20,
    borderRadius: 60,
    marginTop: 10
  },
  gauge: {
    height: 20,
    width: '100%',
    borderRadius: 60
  },
  gaugeTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomBarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 15,
    marginBottom: 20,
    opacity: 0.7
  },
  bottomBar: {
    width: 50,
    height: 5,
    borderRadius: 10,
    backgroundColor: Colors.GREYISH_BROWN_LIGHT,
    alignSelf: 'center'
  }
});

class Header extends React.Component {

  constructor(props) {
    super(props);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        if ((gestureState.moveY > this.state.panelHeight._value) && this.state.panelContentOpacity._value >= 0.98) {
          this._setPanelHeight(gestureState.moveY);
        } else {
          if (gestureState.moveY > 210) {
            if (this.state.panelHeight._value > Dimensions.get('screen').height - 120) {
              if (gestureState.moveY >= Dimensions.get('screen').height - 200) {
                this._setPanelContentOpacity(0);
                this._setPanelHeight(gestureState.moveY);
              } else {
                return;
              }
            }
            this._setPanelContentOpacity(0);
            this._setPanelHeight(gestureState.moveY);
          }
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.moveY > this.state.panelHeight._value) {
          this._setPanelHeight(Dimensions.get('screen').height - 60);
          this._setPanelContentOpacity(1);
        } else {
          if (this.state.panelHeight._value > Dimensions.get('screen').height - 120) {
            if (gestureState.moveY >= Dimensions.get('screen').height - 120) {
              this._setPanelHeight(210);

            } else {
              return;
            }
          }
          this._setPanelHeight(210);
        }
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true
    });

    this.state = {
      eatGauge: new Animated.Value(0),
      drinkGauge: new Animated.Value(0),
      panelHeight: new Animated.Value(0),
      panelContentOpacity: new Animated.Value(0),
    }
  }

  componentDidMount(): void {
    const { eat, drink } = this.props;
    const { eatGauge, drinkGauge } = this.state;

    Animated.timing(drinkGauge, {
      toValue: drink,
      easing: Easing.ease,
      duration: Config.animationDuration,
    }).start();

    Animated.timing(eatGauge, {
      toValue: eat,
      easing: Easing.ease,
      duration: Config.animationDuration,
    }).start();
  }

  _setPanelContentOpacity = (opacity: number) => {
    Animated.spring(this.state.panelContentOpacity, {
      toValue: opacity,
    }).start();
  };

  _setPanelHeight = (height: number) => {
    Animated.spring(this.state.panelHeight, {
      toValue: height,
    }).start();
  };

  render() {
    const { eat, drink, children } = this.props;
    const { eatGauge, drinkGauge, panelHeight, panelContentOpacity } = this.state;

    return (
      <Animated.View {...this._panResponder.panHandlers} style={[styles.container, { height: panelHeight }]}>
        <View style={{ paddingRight: 40, paddingLeft: 40 }}>
          <Text style={styles.title}>{strings.app_name}</Text>
          <View style={[styles.gaugeContainer, { backgroundColor: Colors.SEAFOAM_BLUE_20 }]}>
            <Animated.View style={{ width: drinkGauge.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '1%'],
              }) }}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Colors.CORNFLOWER_BLUE, Colors.SEAFOAM_BLUE]} style={styles.gauge} />
            </Animated.View>
          </View>
          <View style={styles.gaugeTitleContainer}>
            <Text style={styles.gaugeTitle}>NIVEAU D'EAU</Text>
            <Text style={[styles.gaugeTitle, { color: Colors.SEAFOAM_BLUE }]}>{drink}%</Text>
          </View>

          <Animated.View style={[styles.gaugeContainer, { backgroundColor: Colors.LIGHT_PEACH_30 }]}>
            <Animated.View style={{ width: eatGauge.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '1%'],
              }) }}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Colors.PALE_ORANGE, Colors.LIGHT_PEACH]} style={styles.gauge} />
            </Animated.View>
          </Animated.View>
          <View style={styles.gaugeTitleContainer}>
            <Text style={styles.gaugeTitle}>NIVEAU DE NOURRITURE</Text>
            <Text style={[styles.gaugeTitle, { color: Colors.LIGHT_PEACH }]}>{eat}%</Text>
          </View>
        </View>

        {children && (
          <Animated.View style={{ opacity: panelContentOpacity, position: 'relative', flex: 1 }}>
            {children}
          </Animated.View>
        )}

        <View style={styles.bottomBarContainer}>
          <View style={styles.bottomBar}/>
        </View>
      </Animated.View>
    );
  }
}

Header.propTypes = {
  drink: PropTypes.number.isRequired,
  eat: PropTypes.number.isRequired,
  children: PropTypes.node
};

export default Header;
