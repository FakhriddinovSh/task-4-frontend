import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../BASEURL';

export const Register = () => {
	const nameValue = useRef();
	const emailValue = useRef();
	const passwordValue = useRef();
	const rePasswordValue = useRef();
	const navigate = useNavigate();

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const userNameValue = nameValue.current.value;
		const userEmailValue = emailValue.current.value;
		const userPasswordValue = passwordValue.current.value;
		const userRePasswordValue = rePasswordValue.current.value;

		if (
			(userNameValue.length < 2 && userNameValue.length > 30) ||
			!isNaN(userNameValue)
		) {
			alert('Username must be 2-30 length');
			return;
		}

		if (!userEmailValue.endsWith('@gmail.com')) {
			alert('Invalid E-mail');
			return;
		}

		if (userPasswordValue != userRePasswordValue) {
			alert('Different passwords');
			return;
		}

		fetch(`${BASE_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: userNameValue,
				email: userEmailValue,
				password: userPasswordValue,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status == 201) {
					navigate('/');
					window.location.reload();
					localStorage.setItem('token', data.token);
					localStorage.setItem('user_id', data.user[0].user_id);
				}
			})
			.catch((err) => console.log(err.message));
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
						Registration
					</h3>
					<p className="text-sm text-muted-foreground">
						Enter user details to create a new user
					</p>
					<Link
						to="/login"
						className="text-sm text-blue-500 inline-block"
					>
						Already registered?
					</Link>
				</div>
				<div className="px-6 pb-6">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-4">
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="name"
								>
									First Name
								</label>
								<input
									ref={nameValue}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									id="name"
									placeholder="John"
									required=""
									type="text"
								/>
							</div>
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
									type="email"
								/>
							</div>
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="password"
									required
								>
									Password
								</label>
								<input
									ref={passwordValue}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									id="password"
									required
									placeholder="Enter your password"
									type="password"
								/>
							</div>
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="re-password"
								>
									Password Confirmation
								</label>
								<input
									ref={rePasswordValue}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									id="re-password"
									required
									placeholder="Enter your password"
									type="password"
								/>
							</div>
						</div>
						<button
							className="block w-full rounded py-2 pb-2 bg-black text-white"
							type="submit"
						>
							Create User
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
