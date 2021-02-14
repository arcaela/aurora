import React from 'react';
import ReactDOM from 'react-dom'
import AuroraJS from '@arcaela/aurora';
import './config/themes'
import './config/routes'
import './config/firebase'
ReactDOM.render(<React.StrictMode>
    <AuroraJS />
</React.StrictMode>, document.getElementById('app'));