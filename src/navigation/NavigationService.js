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

import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

class NavigationService {
  static setTopLevelNavigator(navigatorRef): void {
    _navigator = navigatorRef;
  }

  static navigate(action) {
    _navigator.dispatch(action);
  }

  static navigateScreen(screenName) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName: screenName
      })
    );
  }

  static clearStackAndNavigateScreen(screenName) {
    NavigationService.navigate(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screenName })]
      })
    );
  }

  static goBack() {
    _navigator.dispatch(NavigationActions.back());
  }
}

export default NavigationService;
