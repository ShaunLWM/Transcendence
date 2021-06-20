const mergeOptions = (options: RequestInit | undefined): RequestInit | undefined => {
	if (!options) return undefined;
	return {
		...options,
		headers: {
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
			accept: "*/*",
			"accept-language": "en-US;q=0.9,en;q=0.8",
			...options?.headers,
		},
	};
};

export async function http<T = unknown>(request: RequestInfo, options: RequestInit | undefined): Promise<T> {
	const response: Response = await fetch(request, mergeOptions(options));
	const payload = await response.json();
	return payload as T;
}

export async function get<T>(path: string, args: RequestInit = {method: "get"}): Promise<T> {
	return await http<T>(path, args);
}

export async function post<T>(
	path: string,
	body: unknown,
	args: RequestInit = {
		method: "post",
		body: JSON.stringify(body),
		headers: {"Content-Type": "application/json"},
	},
): Promise<T> {
	return await http<T>(path, args);
}

export async function put<T>(
	path: string,
	body: unknown,
	args: RequestInit = {method: "put", body: JSON.stringify(body)},
): Promise<T> {
	return await http<T>(path, args);
}
