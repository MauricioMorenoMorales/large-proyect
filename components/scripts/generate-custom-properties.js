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
	console.log('>>>>>choices keys', choicesKeys);
	const choicesCustomProperties = choicesKeys.reduce((prev, curr) => {
		return choices[curr];
	}, '');
	console.log(choicesCustomProperties);
	const data = `
:root {
	${buildCustomProperties}
}
`;

	fs.writeFile('./tokens.css', data, 'utf8', error => {
		if (error) {
			return console.error(error);
		}
	});
};

buildCustomProperties();
