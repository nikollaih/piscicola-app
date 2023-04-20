import { Constants } from "../util";

export const login = async (email: String, password: String) => {
	let response = await fetch(Constants.API.URL + 'login', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
		}) //* <-- Post parameters
	})

	return response;
}