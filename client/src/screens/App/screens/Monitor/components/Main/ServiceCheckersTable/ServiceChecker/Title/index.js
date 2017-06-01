import React from 'react';
import {
    title as titleStyles,
    sup as supStyles,
} from './styles';

const Title = props =>
    <h2 style={titleStyles}>
        {props.title} <sup style={supStyles}>({props.method})</sup>
    </h2>;

export default Title;
