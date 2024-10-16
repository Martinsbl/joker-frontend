interface HttpStatus {
	value: number;
	description: string;
}

export interface ApiErrorResponse {
	status: HttpStatus;
	message: string;
	exceptionName: string;
	url: string;
	stackTrace: string;
}

export interface RequestErrorResponse {
	status: HttpStatus;
	message: string;
	url: string;
}

export class RequestErrorClass extends Error {
	errorData: RequestErrorResponse;

	constructor(requestErrorResponse: RequestErrorResponse) {
		super(requestErrorResponse.message);
		this.name = "RequestError";
		this.errorData = requestErrorResponse;
	}
}

export class ApiErrorClass extends Error {
	errorData: ApiErrorResponse;

	constructor(message: string, apiErrorResponse: ApiErrorResponse) {
		super(message);
		this.name = "APIError";
		this.errorData = apiErrorResponse;
	}
}

export async function checkForRequestErrors(response: Response) {
	if (!response.ok) {
		if (response.status == 500) {
			const apiError: ApiErrorResponse = await response.json();
			throw new ApiErrorClass(apiError.message, apiError);
		} else {
			const requestError: RequestErrorResponse = {
				status: {
					value: response.status,
					description: response.statusText,
				},
				message: "Request error",
				url: response.url,
			};
			throw new RequestErrorClass(requestError);
		}
	}
}
