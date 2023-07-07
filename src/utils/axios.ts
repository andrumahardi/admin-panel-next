import axios from "axios";

export const fetch = axios.create({
	baseURL: "https://some-domain.com/api/",
	headers: { "X-Custom-Header": "foobar" },
});
