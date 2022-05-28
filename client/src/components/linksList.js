
import {MDBTable} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

const LinksList = ({links}) => {
	if(!links){
		return <p>No Links</p>
	}
	return (
		<div >
			<h1 className="text-center mt-3">Your Shorted Links</h1>
			<MDBTable hover>
				<thead>
				<tr>
					<th>#</th>
					<th>Long Link</th>
					<th>Short Link</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
				{ links && links.map((link,ind)=>{
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
			</MDBTable>
		</div>
	);
}

export default LinksList;
