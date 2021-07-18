import React, {useContext, useEffect, useState} from "react";
import {Card, Col, Row,Button,Form} from "react-bootstrap";
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
			<Row className=" text-center">
				<Col lg="4">
					<p>Sponsored by</p>
					<a href="https://flbba.org/" target="_blank" rel="noopener noreferrer">
						<img src="https://himselected.com/sp4.gif" border="0"  alt="flbba.org"/>
					</a>
				</Col>
				<Col lg="4">
					<h1>Short your links</h1>
					<Card className="bg-light">
						<Card.Header>Authentication</Card.Header>
						<Card.Body>
							<Form.Control
								label='Email'
								name='email'
								id='typeEmail'
								type='email'
								className='mb-3'
								value={form.email}
								onChange={changeHandler}
							/>
							<Form.Control
								label='Password'
								name='password'
								id='typeText'
								type='password'
								value={form.password}
								onChange={changeHandler}
								className='mb-3'
								/>
							<Button
								className='mx-2'
								variant="info"
								disabled={loading}
								onClick={signInHandler}
							> Sign In </Button>
							<Button
								className='mx-2'
								variant="success"
								onClick={signUpHandler}
								disabled={loading}
							> Sign Up </Button>
						</Card.Body>
					</Card>
				</Col>
				<Col lg="4">
					<p>Sponsored by</p>
					<a href="https://flbba.org/" target="_blank" rel="noopener noreferrer">
						<img src="https://himselected.com/sp4.gif" border="0"  alt="flbba.org"/>
					</a>
				</Col>
			</Row>
		</>
	)
}
