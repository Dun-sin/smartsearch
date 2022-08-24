const Nightmare = require('nightmare');
const nightmare = Nightmare();

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			// res.status(200).json('This works');
			const result = await getPhones(req.query.phone);
			await res.status(200).json(result);
	}
}

async function getPhones(phone) {
	console.log('started');
	return await nightmare
		.goto('https://www.gsmarena.com/')
		.type('#topsearch-text', phone)
		.click('.go')
		.wait('.makers > ul a')
		.evaluate(() => {
			console.log('still going');
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
			console.log('got here');

			return phones;
		})
		.end()
		.then((link) => {
			console.log('done?');
			return link;
		})
		.catch((err) => `${err}`);
}

// car;
