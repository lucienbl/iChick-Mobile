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

import LocalizedStrings from "react-native-localization";

const en = require("./languages/en.json");

const nonTranslatableKeys = require("./languages/en-not-translatable.json");

const keys = Object.keys(nonTranslatableKeys);
for (let i = 0; i < keys.length; ++i) {
  const key = keys[i];
  const value = nonTranslatableKeys[key];
  if (!(value instanceof Array)) continue;
  nonTranslatableKeys[key] = value.join("\n");
}

export default new LocalizedStrings({
  en: {
    ...en,
    ...nonTranslatableKeys
  }
});
