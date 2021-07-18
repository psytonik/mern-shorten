import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const LinksList = ({links}) => {
	if(!links){
		return <p>No Links</p>
	}
	return (
		<div >
			<h1 className="text-center mt-3">Your Shorted Links</h1>
			<Table striped bordered hover >
				<thead>
				<tr>
					<th>#</th>
					<th>Long Link</th>
					<th>Short Link</th>
					<th>Username</th>
				</tr>
				</thead>
				<tbody>
				{ links.map((link,ind)=>{
					return(
						<tr key={ind}>
							<td>{ind+1}</td>
							<td>{link.from}</td>
							<td>{link.to}</td>
							<td>
								<Link to={`/detail/${link._id}`}>Open</Link>
							</td>
						</tr>
					)
				})}
				</tbody>
			</Table>
		</div>
	);
}

export default LinksList;
