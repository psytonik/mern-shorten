import React, {useCallback, useContext, useEffect, useState} from "react";
import LinksList from "../components/linksList.js";
import Loader from "../components/loader.js";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";



export const LinksPage = ()=> {
	const [links,setLinks] = useState(null);
	const {request,loading} = useHttp();
	const {token} = useContext(AuthContext)

	const getLinks = useCallback(async() => {
		try{
			const data = await request('/api/v1/link','GET',null,{Authorization:`Bearer ${token}`})
			setLinks(data);
		}catch (e) {}
	},[token,request])

	useEffect(()=>{
		getLinks().then(r=>r)
	},[getLinks])

	if(loading){
		return <Loader/>
	}
	return (
		<>
			{!loading && <LinksList links={links}/>}
		</>
	)
}
