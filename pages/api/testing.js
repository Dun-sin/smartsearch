const Nightmare = require('nightmare');
const nightmare = Nightmare();

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const result = await getPhones();
				res.status(200).json({ result });
			} catch (error) {
				res.send(500).json({ message: error });
			}
			break;
		case 'POST':
			postMethod(req, res);
			break;
		case 'PATCH':
			patchMethod(req, res);
			break;
		case 'PUT':
			putMethod(req, res);
			break;
		case 'DELETE':
			deleteMethod(req, res);
			break;
		default:
			res.status(404).json({ message: 'Not found' });
	}
}

async function getPhones() {
	return await nightmare
		.goto('https://www.gsmarena.com/')
		.type('#topsearch-text', 'xiaomi')
		.click('.go')
		.wait('.makers > ul a')
		.evaluate(() => {
			const phones = [];
			const links = document.querySelectorAll('.makers > ul a');
			links.forEach((link) => {
				phones.push(link.href);
			});

			return phones;
		})
		.end()
		.then((link) => link)
		.catch((err) => `Search Failed: ${err}`);
}

function postMethod(req, res) {
	res.status(200).json({ message: 'POST' });
}

function patchMethod(req, res) {
	res.status(200).json({ message: 'PATCH' });
}

function putMethod(req, res) {
	res.status(200).json({ message: 'PUT' });
}

function deleteMethod(req, res) {
	res.status(200).json({ message: 'Delete' });
}
