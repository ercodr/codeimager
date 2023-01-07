import React from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [users, setUsers] = useState(0);

	const getCookie = (name) => {
		// Split the cookies string into an array of name=value pairs
		const cookies = document.cookie.split(";");
		// Find the cookie with the specified name
		const cookie = cookies.find((c) => c.trim().startsWith(`${name}=`));
		// Return the value of the cookie, or null if the cookie was not found
		return cookie ? cookie.split("=")[1] : null;
	};

	useEffect(() => {
		if (getCookie("visited") == null) {
			document.cookie = `visited=true`;
			axios("http://127.0.0.1:8000/");
		}
		axios("http://127.0.0.1:8000/users/")
			.then((res) => res.data)
			.then((data) => setUsers(data["Visitor Count"]));
	}, []);
	return (
		<div className="bg-slate-900 text-white min-h-screen w-full p-4 scrollbar-thin scrollbar-thumb-blue-600">
			<Navbar users={users} />
			<Main />
			<Footer />
		</div>
	);
};

export default App;
