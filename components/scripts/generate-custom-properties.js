const { choices, decisions } = require('../tokens');
const fs = require('fs');

const getValue = function (object) {
	if (typeof object === 'object') {
		getValue(object);
	}
	return;
};

const buildCustomProperties = function () {
	const choicesKeys = Object.keys(choices);
	// console.log('>>>>>choices keys', choicesKeys);

	// const choicesCustomProperties = choicesKeys.reduce((prev, curr) => {
	// 	return choices[curr];
	// }, '');
	// console.log(choicesCustomProperties);

	let choicesstring = '';

	if (typeof choices['colors'] === 'object') {
		const colorkeys = Object.keys(choices['colors']);

		choicesstring = colorkeys.reduce((prev, curr) => {
			if (typeof choices['colors'][curr] === 'object') {
				const brandkeys = Object.keys(choices['colors'][curr]);
				const colorStr = brandkeys.reduce((prevBrandKeys, currBrandKeys) => {
					const value = choices['colors'][curr][currBrandKeys];
					console.log('>>>', value);
					return `
					${prevBrandKeys}
					--colors-${curr}-${currBrandKeys}: ${value};`;
				}, '');
				return `
				${prev}
				${colorStr}
				`;

				return brandkeys;
			} else {
				return `
				${prev}
				--colors-${curr}: ${choices['colors'][curr]};
				`;
			}
			console.log(choices['colors'][curr]);
		}, '');
	}

	const customProperties = choicesstring;

	const data = `
:root {
	${customProperties}
}
`;

	fs.writeFile('../tokens.css', data, 'utf8', error => {
		if (error) {
			return console.error(error);
		}
	});
};

buildCustomProperties();
