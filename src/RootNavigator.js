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
import { SafeAreaView, StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { SplashScreen } from "./splashScreen";
import { DashboardScreen } from "./dashboard";
import { screenIds, NavigationService } from "./navigation";
import { Colors } from './styles';

const NO_NAV_HEADER = () => ({
  header: null
});

const MainNavigation = createStackNavigator(
  {
    [screenIds.SCREEN_SPLASH]: {
      screen: SplashScreen,
      navigationOptions: NO_NAV_HEADER
    },
    [screenIds.SCREEN_DASHBOARD]: {
      screen: DashboardScreen,
      navigationOptions: NO_NAV_HEADER
    }
  },
  {
    initialRouteName: screenIds.SCREEN_SPLASH
  }
);

const AppNavigator = createAppContainer(MainNavigation);

class RootNavigator extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={Colors.WHITE} />
        <AppNavigator
          ref={navigatorRef =>
            NavigationService.setTopLevelNavigator(navigatorRef)
          }
        />
      </SafeAreaView>
    );
  }
}

export default RootNavigator;
