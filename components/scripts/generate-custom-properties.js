const fs = require('fs');
//import { choices, decisions } from '../tokens';

fs.writeFile('./tokens.css', ':root {}', 'utf8', error => {
	if (error) {
		return console.error(error);
	}
});
