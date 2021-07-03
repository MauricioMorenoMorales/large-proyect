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

const buildCustomProperties = function () {
	const choicesKeys = Object.keys(choices);

	// const choicesCustomProperties = choicesKeys.reduce((prev, curr) => {
	// 	return choices[curr];
	// }, '');

	let choicesstring = '';

	// if (typeof choices['colors'] === 'object') {
	// 	const colorkeys = Object.keys(choices['colors']);

	// 	choicesstring = colorkeys.reduce((prev, curr) => {
	// 		if (typeof choices['colors'][curr] === 'object') {
	// 			const brandkeys = Object.keys(choices['colors'][curr]);
	// 			const colorStr = brandkeys.reduce((prevBrandKeys, currBrandKeys) => {
	// 				const value = choices['colors'][curr][currBrandKeys];
	// 				return `
	// 				${prevBrandKeys}
	// 				--colors-${curr}-${currBrandKeys}: ${value};`;
	// 			}, '');
	// 			return `
	// 			${prev}
	// 			${colorStr}
	// 			`;

	// 			return brandkeys;
	// 		} else {
	// 			return `
	// 			${prev}
	// 			--colors-${curr}: ${choices['colors'][curr]};
	// 			`;
	// 		}
	// 	}, '');
	// }

	const customProperties = transformTokens(null, choices);

	const data = `
:root {
	${customProperties}
}
`;

	fs.writeFile(
		'./tokens.css',
		data.replace(/\t/g, '').replace(/\n{2,}/g, '\n'),
		'utf8',
		error => {
			if (error) {
				return console.error(error);
			}
		},
	);
};

buildCustomProperties();
