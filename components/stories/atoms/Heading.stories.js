import React from 'react';
import Heading from '../../atoms/heading/index';

export default {
	title: 'Atoms/Heading',
	component: Heading,
};

export const Default = () => <Heading>Default</Heading>;
export const ColorPrimary = () => <Heading color="primary">Primary</Heading>;
export const ColorDefault = () => <Heading color="default">Primary</Heading>;
export const Small = () => <Heading size="sm">Small</Heading>;
export const ExtraSmall = () => <Heading size="xs">Extra Small</Heading>;
