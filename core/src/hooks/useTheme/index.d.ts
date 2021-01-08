import { ThemeOptions, createMuiTheme, } from '@material-ui/core/styles/createMuiTheme';

const Theme = {
  $all:{},
  $theme:null,
  DEFAULT_THEME:createMuiTheme({}),
  get theme(){ return this.$theme || Object.values(this.$all).pop() || this.DEFAULT_THEME; },
  create(key: String, props?: ThemeOptions){ return this.$all[key] = createMuiTheme(props); },
  use(key: String){ return (key in this.$all)?(this.$theme=this.$all[key]):null; },
};
