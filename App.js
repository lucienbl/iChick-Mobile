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

import React from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./src/reducers/rootReducer";
import RootNavigator from "./src/RootNavigator";

const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  return createStore(rootReducer, initialState, enhancer);
}

export const store = configureStore({});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

export default App;
