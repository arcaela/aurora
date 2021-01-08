import React from 'react';
import ReactDOM from 'react-dom'
import { AuroraJS } from '@arcaela/aurora';
import './config/themes'
import './config/routes'

ReactDOM.render(<React.StrictMode>
    <AuroraJS />
</React.StrictMode>, document.getElementById('app'));