import React from 'react';
import ReactDOM from 'react-dom'
import AuroraJS from '~/aurora';
import '~/aurora/boot';
ReactDOM.render(<React.StrictMode>
    <AuroraJS />
</React.StrictMode>, document.getElementById('app'));