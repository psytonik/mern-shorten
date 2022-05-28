import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'
export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [ready, setReady] = useState(false);
	const [userId, setUserId] = useState(null);

	const login = useCallback(async(jwtToken,id)=>{
		setToken(jwtToken)
		setUserId(id)
		sessionStorage.setItem(storageName,JSON.stringify({token:jwtToken,userId:id}))
	},[]);

	const logOut = useCallback(async()=>{
		setToken(null)
		setUserId(null)
		sessionStorage.removeItem(storageName);
	},[]);

	useEffect(()=>{
		const data = JSON.parse(sessionStorage.getItem(storageName))
		if(data && data.token){
			login(data.token, data.userId).then(r =>r);
		}
		setReady(true);
	},[login]);

	return {login,logOut,token,userId,ready};
};

