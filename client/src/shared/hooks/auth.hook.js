import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'
export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [ready, setReady] = useState(false);
	const [userId, setUserId] = useState(null);

	const login = useCallback(async(jwtToken,id)=>{
		setToken(jwtToken)
		setUserId(id)
		localStorage.setItem(storageName,JSON.stringify({token:jwtToken,userId:id}))
	},[])
	const logOut = useCallback(async()=>{
		setToken(null)
		setUserId(null)
		localStorage.removeItem(storageName);
	},[])
	useEffect(()=>{
		const data = JSON.parse(localStorage.getItem(storageName))
		if(data && data.token){
			login(data.token, data.userId).then(r =>r);
		}
		setReady(true);
	},[login])
	return {login,logOut,token,userId,ready};
}
