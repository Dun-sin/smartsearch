const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

export default async function handler(req, res){
    const result = await getPhoneReview(req.query.link);
    await res.status(200).json(result)
}

async function getPhoneReview(phone){
    console.log('start phone review');
    
    let review;

	const browser = await puppeteer.launch({
		args: [
			'--no-sandbox',
			'--Disable-gpu',
			'--Disable-dev-shm-usage',
			'–No-first-run',
			'–No-zygote',
		],
		headless: true,
		ignoreHTTPSErrors: true,
	});
	const page = await browser.newPage();

	await page.setRequestInterception(true);

	page.on('request', (request) => {
		if (
			request.resourceType() === 'image' ||
			request.resourceType() === 'stylesheet'
		)
			request.abort();
		else request.continue();
	});

    let word = phone.split('-')
    word[0] = word[0] + '-reviews'
    word = word.join('-')
    word = 'https://www.gsmarena.com/' + word
    
	await page.goto(word);

	const ele = await page.evaluate(() => {
		const comments = []
		const commentsElements = document.querySelectorAll('#all-opinions > div .uopin')
		commentsElements.forEach(item => comments.push(item.innerText))

		return comments;
	})

    review = ele;
    await browser.close();
    console.log('review done')
    return review

}