import React, { useEffect, useId, useState } from 'react';
import { Header } from '../../components/Header/Header.jsx';
import { Button, Checkbox } from '@mui/material';
import { BASE_URL } from '../../BASEURL.jsx';

export const Home = () => {
	const [users, setUsers] = useState([]);
	const [clicked, setClicked] = useState('');

	const [selectedIds, setSelectedIds] = useState([]);

	function renderFunc() {
		fetch(`${BASE_URL}/users`)
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}

	useEffect(() => {
		renderFunc();
	}, []);

	const handleCheckbox = (evt) => {
		const user_id = evt.target.closest('span').getAttribute('data-id');
		setSelectedIds(() => [...selectedIds, user_id]);
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		if (selectedIds.length) {
			if (clicked == 'delete') {
				console.log('worked');
				fetch(`${BASE_URL}/user/delete`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(selectedIds),
				})
					.then((res) => {
						if (res.ok) {
							return res.json();
						} else {
							throw new Error(
								'Failed to delete users. Please try again.',
							);
						}
					})
					.then((data) => {
						console.log('DATA:', data);
						renderFunc();
					})
					.catch((err) => console.log('Error:', err.message));
			} else if (clicked == 'block') {
				console.log('worked block');
				fetch(`${BASE_URL}/user/block`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ blockUser: selectedIds }),
				})
					.then((res) => {
						if (res.ok) {
							return res.json();
						} else {
							throw new Error(
								'Failed to delete users. Please try again.',
							);
						}
					})
					.then((data) => {
						console.log('DATA:', data);
						renderFunc();
					})
					.catch((err) => console.log('Error:', err.message));
			} else if (clicked == 'unblock') {
				console.log('worked block');
				fetch(`${BASE_URL}/user/unblock`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ blockUser: selectedIds }),
				})
					.then((res) => {
						if (res.ok) {
							return res.json();
						} else {
							throw new Error(
								'Failed to delete users. Please try again.',
							);
						}
					})
					.then((data) => {
						console.log('DATA:', data);
						renderFunc();
					})
					.catch((err) => console.log('Error:', err.message));
			} else {
				console.log('not worked');
			}
		} else {
			console.log('No length in arr');
		}
	};

	return (
		<>
			<Header />

			<div className="flex flex-col max-w-7xl mx-auto">
				<div className="flex gap-4 p-6">
					<Button
						type="submit"
						onClick={() => setClicked('block')}
						form="myForm"
						data-name="block"
						variant="contained"
					>
						Block
					</Button>
					<Button
						type="submit"
						data-name="unblock"
						onClick={() => setClicked('unblock')}
						className="mx-3"
						variant="outlined"
						form="myForm"
					>
						Unblock
					</Button>
					<Button
						type="submit"
						data-name="delete"
						onClick={() => setClicked('delete')}
						variant="outlined"
						color="error"
						form="myForm"
					>
						Delete
					</Button>
				</div>
				<main className="flex-grow p-6">
					<div className="w-full overflow-auto">
						<form id="myForm" onSubmit={handleSubmit}>
							<table className="w-full caption-bottom text-sm">
								<thead className="[&_tr]:border-b">
									<tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
										<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
											Checked
										</th>
										<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
											Name/Position
										</th>
										<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
											e-mail
										</th>
										<th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
											Last Login
										</th>
										<th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
											Status
										</th>
									</tr>
								</thead>

								<tbody className="[&_tr:last-child]:border-0">
									{users.map((item) => (
										<tr
											key={item.user_id}
											className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
										>
											<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
												<Checkbox
													onClick={handleCheckbox}
													data-id={item.user_id}
												/>
											</td>
											<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
												{item.username}
											</td>
											<td className="p-4 align-middle :pr-0">
												{item.email}
											</td>
											<td className="p-4 align-middle text-right">
												{item.last_login}
											</td>
											<td className="p-4 align-middle text-right">
												{item.active_status ? (
													<span className="px-2 py-1 bg-green-500 text-red-50 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width={24}
															height={24}
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
															className=" w-4 h-4 inline-block mr-1"
														>
															<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
															<path d="M7 7h.01" />
														</svg>
														Active
													</span>
												) : (
													<span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width={24}
															height={24}
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
															className=" w-4 h-4 inline-block mr-1"
														>
															<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
															<path d="M7 7h.01" />
														</svg>
														BLOCKED
													</span>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</form>
					</div>
				</main>
			</div>
		</>
	);
};
