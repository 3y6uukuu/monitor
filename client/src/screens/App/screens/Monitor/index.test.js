import React from 'react';
import ReactDOM from 'react-dom';
import Monitor from './';

it('renders without crashing',() => {
    const div = document.createElement('div');
    ReactDOM.render(<Monitor />, div);
});

// TBD