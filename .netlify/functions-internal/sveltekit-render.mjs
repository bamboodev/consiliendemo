import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Anton.woff2","assets/.DS_Store","assets/img/2022_Security_Awareness_Training.pdf","assets/news/Consilien_IC24_SaaS_Protection_(1).pdf","assets/news/Consilien_IC24_SaaS_Protection_for_Google_Workplace_(1).pdf","assets/vendor/datto/.DS_Store","assets/vendor/datto/css/bootstrap-grid.css","assets/vendor/datto/css/dattorto.css","assets/vendor/datto/fonts/DattoDINExp-Bold.woff2","assets/vendor/datto/fonts/DattoDINExp-Italic.woff2","assets/vendor/datto/fonts/DattoDINExp-Regular.woff2","assets/vendor/datto/js/dattorto.js","assets/vendor/datto/js/jquery-git.js","assets/vendor/datto/js/vue.min.js","favicon.png","favicon.svg","images/Consilien_Logo_text.svg","images/Customer-Journey.jpg","images/Fred-Romero2.jpg","images/Jim-De-Vico.jpg","images/batch_cyber.png","images/batch_service.png","images/chart-a-secure-path-bg.jpg","images/consilien-network.svg","images/cyberfit.png","images/cyberfit2.png","images/eric-h.-kong.jpg","images/home-hero-bg2.jpg","images/home_cloud.png","images/home_resp.png","images/ico-alert.png","images/ico-backup.png","images/ico-chat.png","images/ico-comply.png","images/ico-growth.png","images/ico-ic24.png","images/ico-pie.png","images/ico-security-worker.png","images/ico-security.png","images/logo.svg","images/partners/appriver-logo.png","images/partners/cisco-logo.png","images/partners/connectwise-logo.png","images/partners/datto-logo.png","images/partners/dell-logo.png","images/partners/microsoft-logo.png","images/partners/onetrust-logo_1.png","images/partners/sonicwall-logo.png","images/partners/vmware-logo.png","images/partners/watchguard-logo.png","images/puzzle.png","images/scalability.jpg","images/security.jpg","images/stability-left.jpg","images/teamwork.png","images/top_clutch.co_it_services_company_manufacturing_california_(1)_.png"]),
	mimeTypes: {".woff2":"font/woff2",".pdf":"application/pdf",".css":"text/css",".js":"text/javascript",".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.B2Wrok6l.js",app:"_app/immutable/entry/app.ClG32LEJ.js",imports:["_app/immutable/entry/start.B2Wrok6l.js","_app/immutable/chunks/Jgaj-CM2.js","_app/immutable/chunks/CqKqjUHI.js","_app/immutable/entry/app.ClG32LEJ.js","_app/immutable/chunks/CqKqjUHI.js","_app/immutable/chunks/CvtrOLOy.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js'))
		],
		routes: [
			{
				id: "/api/preview",
				pattern: /^\/api\/preview\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/preview/_server.ts.js'))
			},
			{
				id: "/api/webhook",
				pattern: /^\/api\/webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/webhook/_server.ts.js'))
			},
			{
				id: "/news",
				pattern: /^\/news\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/news/category/[category]",
				pattern: /^\/news\/category\/([^/]+?)\/?$/,
				params: [{"name":"category","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/news/[slug]",
				pattern: /^\/news\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/sitemap.xml/_server.ts.js'))
			},
			{
				id: "/slice-simulator",
				pattern: /^\/slice-simulator\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/[[preview=preview]]",
				pattern: /^(?:\/([^/]+))?\/?$/,
				params: [{"name":"preview","matcher":"preview","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/[[preview=preview]]/[uid]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"preview","matcher":"preview","optional":true,"rest":false,"chained":true},{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			const { match: preview } = await import ('../server/entries/matchers/preview.js')
			return { preview };
		},
		server_assets: {}
	}
}
})());
