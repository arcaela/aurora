import { useState } from 'react';
import { createMuiTheme } from '@material-ui/core';

export const Theme = {
    $all:{},
    $theme:null,
    DEFAULT_THEME:createMuiTheme({}),
    get theme(){ return this.$theme || this.$all['DEFAULT'] || this.DEFAULT_THEME; },
    create(key, props){ return this.$all[key] = createMuiTheme(props); },
    use(key){ return (key in this.$all)?(this.$theme=this.$all[key]):null; },
};

export function useTheme(){
    const [ theme, setTheme ] = useState(Theme.theme);
    Theme.$theme = theme;
    Theme.use = (key)=>{
        if(key&&key in Theme.$all)
            Theme.$theme=Theme.$all[key];
        return setTheme(Theme.theme);
    };
    return Theme;
};


export default Theme;