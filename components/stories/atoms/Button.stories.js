import React from 'react'
import Button from '../../atomic/atoms/Button'

export default {
	title: 'Atoms/Button',
	component: Button,
}

const Template = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
	primary: true,
	children: 'Primary',
}