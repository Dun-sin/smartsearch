const puppeteer = require('puppeteer');

export default async function handler(req, res) {
	const result = await getPhones(req.query.phone);
	await res.status(200).json(result);
}

async function getPhones(phone) {
	console.log('started');
	let phones;

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true,
		ignoreHTTPSErrors: true,
	});
	const page = await browser.newPage();
	await page.goto('https://www.gsmarena.com/');
	await page.type('#topsearch-text', phone);

	await page.$eval('.go', (click) => click.click());

	await page.waitForSelector('.makers > ul a');

	const ele = await page.evaluate(() => {
		const elements = [];
		document.querySelectorAll('.makers > ul a').forEach((item) =>
			elements.push({
				link: item.getAttribute('href'),
				image: item.firstElementChild.getAttribute('src'),
				phoneName: item.lastElementChild.innerText.replace('\n', ' '),
			}),
		);
		return elements;
	});
	phones = ele;

	await browser.close();
	console.log('done?');
	return phones;
}
