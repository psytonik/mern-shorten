import {useState,useCallback} from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url,method = 'GET', body = null,headers = {}) => {
		setLoading(true);
		try {
			if(body){
				body  = JSON.stringify(body);
				headers['Content-Type'] = 'application/json';
			}
			const response = await fetch(url, {method,body,headers});
			const data = await response.json();
			if(!data.statusText === "OK"){
				throw new Error('Something going wrong');
			}
			setLoading(false)
			return data;
		} catch (error) {
			const parsedError = JSON.parse(error.request.response);
			setLoading(false);
			setError(parsedError.message)
			throw parsedError.message
		}
	},[])

	const clearErrors = useCallback(() => setError(null),[]);

	return {loading,request,error, clearErrors}
}
