
import {ToastBody, ToastHeader,Toast} from "reactstrap";
export const UseMessage = ({props}) => {

		return (
			<div className="p-3 my-2 rounded">
				<Toast icon="danger">
					<ToastHeader>
						Error
					</ToastHeader>
					<ToastBody>
						{props}
					</ToastBody>
				</Toast>
			</div>
		)
}
