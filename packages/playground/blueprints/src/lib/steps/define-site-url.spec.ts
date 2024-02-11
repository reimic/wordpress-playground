import { NodePHP } from '@php-wasm/node';
import { RecommendedPHPVersion } from '@wp-playground/wordpress';
import { defineSiteUrl } from './define-site-url';
import { joinPaths } from '@php-wasm/util';

const docroot = '/php';
const wpConfigPath = joinPaths(docroot, '/wp-config.php');
describe('Blueprint step defineSiteUrl', () => {
	let php: NodePHP;
	beforeEach(async () => {
		php = await NodePHP.load(RecommendedPHPVersion, {
			requestHandler: { documentRoot: `${docroot}` },
		});
		php.mkdir(docroot);
	});

	it('should define site url', async () => {
		// console.log(php.listFiles(docroot));
		// const documentRoot = php.documentRoot;

		// expect(php.fileExists(wpConfigPath)).toBe(false);
		// const documentRoot = php.documentRoot;
		// expect(documentRoot).toContain(/bla/);

		// expect(php.fileExists(wpConfigPath)).toBe(false);
		// const wpConfigBefore = php.readFileAsText(wpConfigPath);
		// expect(wpConfigBefore).toContain(/bla/);
		php.writeFile(`${docroot}/wp-config.php`, ``);
		const siteUrl = 'http://test.url';
		defineSiteUrl(php, {
			siteUrl: siteUrl,
		});

		// where does this create the wp-config.php file?
		// what is the optimal way to browse all files?
		// how to debug the code, add breakpoints and see that the values at certain points are?
		// console.log(php.listFiles(docroot));
		const wpConfig = php.readFileAsText(wpConfigPath);
		console.log(wpConfig);
		expect(wpConfig).toContain(/bla/);
		// expect(php.fileExists(wpConfigPath)).toBe(false);

		// const wpConfigAfter = php.readFileAsText(wpConfigPath);
		// expect(wpConfigAfter).toContain(/bla/);a
	});

	// it('should prepend constants not already present in the PHP code', async () => {
	// 	const phpCode = `<?php
	// 	echo json_encode([
	// 		"SITE_URL" => SITE_URL,
	// 	]);
	// 	`;
	// 	const rewritten = await rewriteDefineCalls(php, phpCode, {
	// 		SITE_URL: 'http://test.url',
	// 	});
	// 	expect(rewritten).toContain(`define('SITE_URL','http://test.url');`);

	// 	const response = await php.run({ code: rewritten });
	// 	expect(response.errors).toHaveLength(0);
	// 	expect(response.json).toEqual({
	// 		SITE_URL: 'http://test.url',
	// 	});
	// });
});
