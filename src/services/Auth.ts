import { Constants } from "../util";

export const login = async (email: String, password: String) => {
    let response = await fetch(Constants.API.URL + 'login', {
		method: 'POST',
		body: JSON.stringify([{
			email: email,
			password: password,
			timezone: ""
		}]) //* <-- Post parameters
	})

	return await response.json();
}