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
	${customProperties}
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
