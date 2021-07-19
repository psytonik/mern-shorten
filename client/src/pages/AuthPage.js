
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
		clearErrors();
	}, [error,clearErrors])
	const signUpHandler = async () => {
		try {
			const data = await request('/api/v1/auth/sign-up','POST', {...form});
			console.log('data from sign up', data)
		} catch (e) {
		}
	}
	const signInHandler = async () => {
		try {
			const data = await request('/api/v1/auth/sign-in','POST', {...form});
			auth.login(data.token,data.userId);
		} catch (e) {
		}
	}

	return (
		<>
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
