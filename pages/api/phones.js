const Nightmare = require('nightmare');
const nightmare = Nightmare();

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			const result = await getPhones();
			res.status(200).json(result);
	}
}

async function getPhones() {
	return await nightmare
		.goto('https://www.gsmarena.com/')
		.type('#topsearch-text', 'samsung')
		.click('.go')
		.wait('.makers > ul a')
		.evaluate(() => {
			const phones = [];
			const links = document.querySelectorAll('.makers > ul a');
			links.forEach((link) => {
				const a = link.href;
				const image = link.firstElementChild.getAttribute('src');
				const phoneName = link.lastElementChild.innerText.replace('\n', ' ');
				phones.push({
					link: a,
					image,
					phoneName,
				});
			});

			return phones;
		})
		.end()
		.then((link) => {
			console.log(link);
			return link;
		})
		.catch((err) => `${err}`);
}
