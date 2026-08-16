export const environment = {
	apiBaseUrl: import.meta.env.NG_APP_API_BASE_URL,
	googleClientId: import.meta.env.NG_APP_GOOGLE_CLIENT_ID,
	googleRedirectUri: import.meta.env.NG_APP_GOOGLE_REDIRECT_URI,

	emailjs: {
	serviceId: import.meta.env.NG_APP_EMAILJS_SERVICE_ID,
	templateId: import.meta.env.NG_APP_EMAILJS_TEMPLATE_ID,
	publicKey: import.meta.env.NG_APP_EMAILJS_PUBLIC_KEY,
	}

};
