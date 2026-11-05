/* Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted from .reference/foglamp/apps/web/src/components/scan/favicon.ts; derived here under Apache-2.0.
 */
export const getGoogleFavicon = (domain: string) => {
	if (domain.includes("https://") || domain.includes("http://")) {
		return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=256`;
	} else {
		return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=256`;
	}
};
