import { useState } from 'react';
import { createMuiTheme } from '@material-ui/core';
export const ThemeState = {
  $all: {},
  $theme: null,
  DEFAULT_THEME: createMuiTheme({}),

  get theme() {
    return this.$theme || this.$all['DEFAULT'] || this.DEFAULT_THEME;
  },

  create(key, props) {
    return this.$all[key] = createMuiTheme(props);
  },

  use(key) {
    return key in this.$all ? this.$theme = this.$all[key] : null;
  }

};
export default function Theme() {
  const [theme, setTheme] = useState(ThemeState.theme);
  ThemeState.$theme = theme;

  ThemeState.use = key => {
    if (key && key in ThemeState.$all) ThemeState.$theme = ThemeState.$all[key];
    return setTheme(ThemeState.theme);
  };

  return ThemeState;
}
;
export { Theme };