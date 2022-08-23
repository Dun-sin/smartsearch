const Nightmare = require('nightmare');
const nightmare = Nightmare();

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
		.then((link) => link)
		.catch((err) => `Search Failed: ${err}`);
}

getPhones().then((done) => console.log(done));

// getPhones().then((x) => {
// 	console.log(x);
// });

// getPhones().then((x) => {

// x.forEach((phone) => {
// 	nightmare
// 		.goto(phone)
// 		.wait('#specs-list')
// 		.evaluate(() => {
// 			console.log('deosn');
// 			const specs = document.querySelector('#specs-list');
// 			console.log(specs);
// 			return specs;
// 		})
// 		.end()
// 		.then((spec) => console.log(spec))
// 		.catch((err) => `Failed: ${err}`);
// });
// });

// nightmare
// 	.goto('https://www.gsmarena.com/xiaomi_mix_fold_2-11758.php')
// 	.evaluate(() => {
// 		const specInfos = document.querySelectorAll('#specs-list .nfo');
// 		const specs = [];

// 		specInfos.forEach((specInfo) => {
// 			specInfo.parentElement.childNodes.forEach((element) => {
// 				if (element.nodeName === 'TH') {
// 					const allowed = [
// 						'Memory',
// 						'Display',
// 						'Platform',
// 						'Sound',
// 						'Features',
// 						'Comms',
// 						'Battery',
// 					];
// 					if (allowed.includes(element.textContent)) pushElement();

// 					function pushElement() {
// 						const value = {};
// 						value[element.textContent] = specInfo.innerHTML;
// 						specs.push(value);
// 					}
// 				}
// 			});
// 		});
// 		return specs;
// 	})
// 	.end()
// 	.then((spec) => console.log(spec))
// 	.catch((err) => `Failed: ${err}`);
