import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";

export const CreatePage = ()=> {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const {request} = useHttp();
	const [link,setLink] = useState('');

	const pressHandler = async event => {
		if(event.key === 'Enter'){
			try{
				const data =  await request(
					'/api/v1/link/generate',
					'POST',
					{from:link},
					{Authorization:`Bearer ${auth.token}`}
				)
				history.push(`/detail/${data.link._id}`)
			} catch (e) {}
		}
	}
	return (
		<div className="row">
			<div className="col-8 offset-2 pt-2">
				<h1 className="text-center">Short Link Generator</h1>
				<input
					label='Link'
					id='link'
					type='text'
					className='form-control mb-3'
					value={link}
					onChange={e=>setLink(e.target.value)}
					onKeyPress={pressHandler}
					placeholder="Insert Your Link"
					/>
			</div>
		</div>
	)
}
