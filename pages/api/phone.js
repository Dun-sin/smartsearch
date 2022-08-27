const puppeteer = require('puppeteer');

export default async function handler(req, res) {
	const result = await getFullPhoneInfo(req.query.link);
	await res.status(200).json(result);
}

async function getFullPhoneInfo(phone) {
	console.log('started single');
	let phones;

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.gsmarena.com/${phone}`);

	const ele = await page.evaluate(() => {
		const elements = {
			Platform: document.querySelector('[data-spec="os-hl"]').textContent,
			Storage: document.querySelector('[data-spec="storage-hl"]').textContent,
			Ram: document.querySelector('.accent-expansion').textContent,
			Battery: document.querySelector('.accent-battery').textContent,
			'Main Camera':
				document.querySelector('[data-spec="camerapixels-hl"]').textContent +
				document.querySelector('[data-spec="camerapixels-hl"]').nextSibling
					.textContent,
			Display:
				document.querySelector('[data-spec="displaysize-hl"]').textContent +
				' ' +
				document.querySelector('[data-spec="displayres-hl"]').textContent,
			Price: getPrice(),
		};

		function getPrice() {
			if (document.querySelector('.pricing') === null) return;

			const firstPrice =
				document.querySelector('.pricing tbody').firstElementChild
					.lastElementChild.firstElementChild.innerText;
			const secondPrice =
				document.querySelector('.pricing tbody').lastElementChild
					.lastElementChild.firstElementChild.innerText;

			const price = 'around ' + firstPrice + ' - ' + secondPrice;

			return price;
		}

		const specInfos = document.querySelectorAll('#specs-list .nfo');

		specInfos.forEach((specInfo) => {
			specInfo.parentElement.childNodes.forEach((element) => {
				if (element.nodeName === 'TH') {
					const allowed = ['Sound', 'Features'];

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
