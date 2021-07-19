import {MDBSpinner} from "mdb-react-ui-kit";
import React from 'react';


const Loader = () => {
	return (
		<div className='d-flex justify-content-center' style={{marginTop:'25%'}}>
			<MDBSpinner grow color='info' style={{ width: '3rem', height: '3rem' }}>
				<div />
			</MDBSpinner>
		</div>
	);
};

export default Loader;
