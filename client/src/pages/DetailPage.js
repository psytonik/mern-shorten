import React, {useCallback, useContext, useEffect, useState} from "react";
import { useParams} from 'react-router-dom';
import LinkCard from "../components/linkCard.js";
import Loader from "../components/loader.js";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";


export const DetailPage = ()=> {
	const [link,setLink] = useState(null);
	const linkId = useParams().id;
	const {request,loading} = useHttp();
	const {token} = useContext(AuthContext)

	const getLink = useCallback(async()=>{
		try{
			const data =await request(
				`/api/v1/link/${linkId}`,
				"GET",
				null,
				{Authorization:`Bearer ${token}`}
			);
			setLink(data)
		}catch (e) {}
	},[token,linkId,request])
	useEffect(()=>{
		getLink().then(r =>r);
	},[getLink]);

	if(loading){
		return <Loader />
	}
	return (
		<>
			{!loading && link && <LinkCard link={link} />}
		</>
	)
}
