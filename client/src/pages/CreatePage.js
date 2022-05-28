import {MDBInput, MDBRow} from "mdb-react-ui-kit";
import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {BACK_END_LINK} from "../constants/others.js";
import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';


export const CreatePage = ()=> {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const {request} = useHttp();
	const [link,setLink] = useState('');

	const pressHandler = async event => {
		if(event.key === 'Enter'){
			try{
				const {newLink} = await request(
					`${BACK_END_LINK}/api/v1/link/generate`,
					'POST',
					{from:link},
					{Authorization:`Bearer ${auth.token}`}
				)
				toast.success('Link Successfully added');
				if(newLink){
					history.push(`/detail/${newLink._id}`);
				}
			} catch (e) {
				toast.error(e.message);
			}
		}
	}
	return (
		<MDBRow>
			<div className="col-8 offset-2 pt-2">
				<h1 className="text-center">Short Link Generator</h1>
				<MDBInput
					id='link'
					type='url'
					size='lg'
					value={link}
					onChange={e=>setLink(e.target.value)}
					onKeyPress={pressHandler}
					label="Insert Your Link"
					/>
				<ToastContainer/>
			</div>
		</MDBRow>
	)
}
