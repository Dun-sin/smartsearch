const Nightmare = require('nightmare');
const nightmare = Nightmare();

export default async function handler(req, res) {
	// const { method } = req;

	try {
		const result = await getPhones();
		res.status(200).json({ result });
	} catch (error) {
		res.send(500).json({ message: error });
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
		.then((link) => link)
		.catch((err) => `Search Failed: ${err}`);
}
