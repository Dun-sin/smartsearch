const Nightmare = require('nightmare');
const nightmare = Nightmare();

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			const result = await getFullPhoneInfo(req.query.link);
			await res.status(200).json(result);
	}
}

async function getFullPhoneInfo(phone) {
	console.log('started');
	return await nightmare
		.goto(phone)
		.evaluate(() => {
			const specInfos = document.querySelectorAll('#specs-list .nfo');
			const value = {};

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
							value[element.textContent] = specInfo.innerHTML;
						}
					}
				});
			});
			return value;
		})
		.end()
		.then((specs) => {
			console.log('done?');
			return specs;
		})
		.catch((err) => err);
}

//
