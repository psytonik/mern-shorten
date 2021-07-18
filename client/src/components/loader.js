import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader = () => {
	return (
		<div style={{display:'flex', justifyContent:'center', paddingTop:'50%'}}>
			<Spinner animation="grow" />
		</div>
	);
};

export default Loader;
