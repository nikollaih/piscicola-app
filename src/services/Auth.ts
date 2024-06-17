import {Constants} from "../util";

export const login = async (email: String, password: String) => {
	return await fetch(Constants.API.URL + 'auth/login', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
		}) //* <-- Post parameters
	});
}