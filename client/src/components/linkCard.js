import React from "react";
const LinkCard = ({link})=> {
	return (
		<div className="container">
			<h2>Link</h2>
			<p>ShortLink: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
			<p>Original Link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
			<p>Clicks: <strong>{link.clicks}</strong></p>
			<p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
		</div>
	)
}

export default LinkCard;
