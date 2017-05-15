import React from 'react';
import {
    title as titleStyles,
    sup as supStyles,
} from './styles';

const Title = props =>
    <div style={titleStyles}>
        {props.title} <sup style={supStyles}>({props.method})</sup>
    </div>;

export default Title;
