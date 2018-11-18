//Followed tutorial by Forrest Walker: https://www.youtube.com/watch?v=Q0vzqlnWWZw&index=2&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP

//Class property, Helper to create URLs
class Helper {
	static baseURL(){
		//Part of Foursquare URL that doesn't change
		return "https://api.foursquare.com/v2";
	}
	static auth(){
		//Object with Foursquare Client ID, Client Secret and version parameter, to be made into strings for URL
		const keys = {
			client_id: "T3TKEEBCRZCABHK1CQTIZNYN2SSBUM02S0USS0QAUYRANAMH",
			client_secret: "VFDP3DSYKSP10MQ002CW22W14JLKTXDA3EWNQ2MPBOPJNYVP",
			v: "20181013"
		};
		//Put keys into array of strings for URL
		return Object.keys(keys)
		.map(key => `${key}=${keys[key]}`)
		.join("&");
	}
	static urlBuilder(urlParams) {
		//If parameter is empty, return empty string
		if(!urlParams) {
			return ''
		}
		//Return array of strings for URL
		return Object.keys(urlParams)
		.map(key => `${key}=${urlParams[key]}`)
		.join("&");
	}
	static headers() {
		return {
			Accept: "application/json"
		};
	}
	static simpleFetch(endPoint, method, urlParams) {
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(
			`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
			urlParams
			)}`,
			requestData
			).then(res => res.json()
		);
	}
}

export default class FourSquareAPI {
	static search(urlParams){
		//Search suffix of URL
		return Helper.simpleFetch("/venues/search", "GET", urlParams);
	}
	static getVenueDetails(VENUE_ID){
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");

	}
	static getVenuePhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}