const { choices, decisions } = require('../tokens');
const fs = require('fs');

const transformTokens = function (parentKey, object) {
	const keys = Object.keys(object);
	return keys.reduce((tokensTransformed, objectKey) => {
		const value = object[objectKey];
		if (typeof value === 'object') {
			const customProperty = parentKey
				? `${parentKey}-${objectKey}`
				: `${objectKey}`;
			return `
				${tokensTransformed}
				${transformTokens(`${customProperty}`, value)}
			`;
		}
		const customProperty = parentKey
			? `--${parentKey}-${objectKey}`
			: `${parentKey}-${objectKey}`;
		return `
		${tokensTransformed}
		${customProperty}: ${value};
		`;
	}, '');
	return;
};

const buildTokens = function () {
	const customProperties = `
	${transformTokens(null, choices)}
	${transformTokens(null, decisions)}
	`;

	const data = `
:root {
	--colors-brand-medium-purple: #9879e9;
	--colors-brand-white: #fff;
	--colors-brand-white-lilac: #e8e8e8;
	--shadow: 0px 4px 5px var(var(--colors-brand-white-lilac));
	--colors-brand-mediumPurple: #9879e9;
	--colors-brand-white: #fff;
	--colors-brand-whiteLilac: #e8e8e8;
	--colors-brand-east-bay: #455970;
	--colors-transparent: transparent;
	--colors-black: #000;
	--colors-white: #fff;
	${customProperties
		.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
		.toLowerCase()}
}
`;

	fs.writeFile(
		'./tokens.css',
		data.replace(/\t/g, '').replace(/\n{2,}/g, '\n\t'),
		'utf8',
		error => {
			if (error) {
				return console.error(error);
			}
		},
	);
};

buildTokens();
