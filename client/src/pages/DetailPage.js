import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams,Redirect} from 'react-router-dom';
import LinkCard from "../components/linkCard.js";
import LinkChart from "../components/linkChart.js";
import Loader from "../components/loader.js";
import {BACK_END_LINK} from "../constants/others.js";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";

export const DetailPage = ()=> {
	const [link,setLink] = useState(null);
	const linkId = useParams().id;
	const {request,loading} = useHttp();
	const {token,userId} = useContext(AuthContext);

	const getLink = useCallback(async()=>{
		try{
			const data = await request(
				`${BACK_END_LINK}/api/v1/link/${linkId}`,
				"GET",
				null,
				{Authorization:`Bearer ${token}`}
			);
			setLink(data)
		}catch (e) {}
	},[token,linkId,request])

	useEffect(()=>{
		getLink().then(r=>r);
	},[getLink]);

	if(link && link.owner !== userId){
		return <Redirect to="/create" />
	}
	if(loading){
		return <Loader />
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-4 mt-3">
					{!loading && link && <LinkCard link={link} />}
				</div>
				<div className="col-md-8">
					{!loading && link && <LinkChart link={link}/>}
				</div>
			</div>
		</div>
	)
}
