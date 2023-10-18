import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../BASEURL';

export const Login = () => {
	const emailValue = useRef();
	const passwordValue = useRef();
	const navigate = useNavigate();

	const handleSubmit = (evt) => {
		evt.preventDefault();

		fetch(`${BASE_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: emailValue.current.value,
				password: passwordValue.current.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status == 200) {
					if (data?.user?.active_status == false) {
						alert('You are blocked!!!');
						return;
					}
					localStorage.setItem('token', data.token);
					localStorage.setItem('user_id', data.user.user_id);
					navigate('/');
					window.location.reload();
				} else {
					alert('User not found');
				}
			})
			.catch((err) => alert('Error' + err.message));
	};

	return (
		<div className="flex flex-col h-screen">
			<div
				className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-3xl mx-auto mt-16"
				style={{ width: '432px' }}
				data-v0-t="card"
			>
				<div className="flex flex-col space-y-1.5 p-6">
					<h3 className="text-2xl font-semibold leading-none tracking-tight">
						Login
					</h3>
					<p className="text-sm text-muted-foreground">
						Enter user details to Login
					</p>
					<Link
						to="/register"
						className="text-sm text-blue-500 inline-block"
					>
						Don't have an account?
					</Link>
				</div>
				<div className="px-6 pb-6">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-4">
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="email"
								>
									Email
								</label>
								<input
									ref={emailValue}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									id="email"
									placeholder="johndoe@example.com"
									required
									type="text"
								/>
							</div>
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="password"
								>
									Password
								</label>
								<input
									ref={passwordValue}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									id="password"
									required=""
									placeholder="Enter your password"
									type="password"
								/>
							</div>
						</div>
						<button
							className="block w-full rounded py-2 pb-2 bg-black text-white"
							type="submit"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
