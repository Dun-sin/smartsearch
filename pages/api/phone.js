const puppeteer = require('puppeteer');

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			const result = await getFullPhoneInfo(req.query.link);
			await res.status(200).json(result);
	}
}

async function getFullPhoneInfo(phone) {
	let phones;

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.gsmarena.com/${phone}`);

	const ele = await page.evaluate(() => {
		const elements = {};
		const specInfos = document.querySelectorAll('#specs-list .nfo');

		specInfos.forEach((specInfo) => {
			specInfo.parentElement.childNodes.forEach((element) => {
				if (element.nodeName === 'TH') {
					const allowed = [
						'Memory',
						'Display',
						'Platform',
						'Sound',
						'Features',
						'Main Camera',
						'Battery',
					];

					if (allowed.includes(element.textContent)) pushElement();

					function pushElement() {
						elements[element.textContent] = specInfo.innerHTML;
					}
				}
			});
		});

		return elements;
	});
	phones = ele;

	await browser.close();
	console.log('done');
	return phones;
}
