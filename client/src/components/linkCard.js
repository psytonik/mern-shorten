import {MDBCard, MDBCardBody, MDBCardHeader, MDBCardTitle} from "mdb-react-ui-kit";
import React from "react";

const LinkCard = ({link})=> {
	return (
					<MDBCard className="shadow-5">
						<MDBCardHeader>
							<MDBCardTitle className="text-center">Link</MDBCardTitle>
						</MDBCardHeader>
						<MDBCardBody>
							<p>Date of creation: <strong>{new Date(link.createdAt).toLocaleDateString()}</strong></p>
							<p>ShortLink: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
							<p>Original Link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
							<p>Total Clicks: <strong>{link.clicks}</strong></p>
						</MDBCardBody>
					</MDBCard>
	)
}

export default LinkCard;
