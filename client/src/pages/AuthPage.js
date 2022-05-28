
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardFooter,
	MDBCardHeader,
	MDBCardTitle,
	MDBCheckbox,
	MDBInput
} from "mdb-react-ui-kit";
import React, {useContext, useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {BACK_END_LINK} from "../constants/others.js";


import {AuthContext} from "../context/AuthContext.js";
import {useHttp} from "../shared/hooks/http.hook.js";

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const {loading, request, error, clearErrors} = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	const changeHandler = (event) => {
		setForm({...form, [event.target.name]: event.target.value})
	};
	useEffect(() => {
		toast.error(error)
		clearErrors();
	}, [error,clearErrors]);

	const signUpHandler = async () => {
		try {
			const data = await request(`${BACK_END_LINK}/api/v1/auth/sign-up`,'POST', {...form});
			if(data.success === false){
				return toast.error(data.message);
			} else {
				return toast.success(data.message);
			}
		} catch (e) {
			return toast.error("Registration Failed ", e.message);
		}
	}
	const signInHandler = async () => {
		try {
			const data = await request(`${BACK_END_LINK}/api/v1/auth/sign-in`,'POST', {...form});

			if(data.success === false) {
				return toast.error(data.message)
			} else {
				await auth.login(data.token,data.userId);
				return toast.success(data.message);
			}
		} catch (e) {
			return toast.error(e.message);
		}
	}

	return (
		<>
			<ToastContainer/>
			<div className="row text-center mt-5">
				<div className="col-md-3">
					<p>Sponsored by</p>
					<a href="https://flbba.org/" target="_blank" rel="noopener noreferrer">
						<img src="https://himselected.com/sp4.gif" border="0"  alt="flbba.org"/>
					</a>
				</div>
				<div className="col-md-6" >
						<MDBCard className="shadow-5">
							<MDBCardHeader>
								<MDBCardTitle>Authorization</MDBCardTitle>
							</MDBCardHeader>
							<MDBCardBody>
									<div className="form-outline mb-3">
										<MDBInput
											name='email'
											id='email'
											type='email'
											label="Email"
											size='lg'
											value={form.email}
											onChange={changeHandler}
										/>
									</div>
									<div className="form-outline mb-3">
										<MDBInput
											name='password'
											id='password'
											type='password'
											label="Password"
											size='lg'
											value={form.password}
											onChange={changeHandler}
											className='form-control mb-3'
										/>
									</div>
								<div className="form-check d-flex justify-content-center mb-1">
									<MDBCheckbox
										type="checkbox"
										value=""
										label="I have read and agree to the terms"
									/>
								</div>
							</MDBCardBody>
							<MDBCardFooter className=" d-grid d-md-flex justify-content-between">
								<MDBBtn
										outline
										rounded
										color='secondary'
										size='lg'
								        disabled={loading}
								        onClick={signInHandler}
								> Sign In </MDBBtn>
								<MDBBtn
										color="info"
										rounded
										outline
										size='lg'
								        onClick={signUpHandler}
								        disabled={loading}
								> Sign Up </MDBBtn>
							</MDBCardFooter>
						</MDBCard>
				</div>
				<div className="col-md-3">
					<p>Sponsored by</p>
					<a href="https://flbba.org/" target="_blank" rel="noopener noreferrer">
						<img src="https://himselected.com/sp4.gif" border="0"  alt="flbba.org"/>
					</a>
				</div>
			</div>
		</>
	)
}
