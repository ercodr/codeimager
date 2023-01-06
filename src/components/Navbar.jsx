import { BsGithub } from "react-icons/bs";

const Navbar = () => {
	return (
		<nav className="py-4">
			<div className="flex justify-between container mx-auto border-b p-4">
				<a className="cursor-pointer font-black text-xl brand before:bg-gradient-to-r before:from-red-600 before:via-blue-200 before:to-blue-600">
					CodeImager
				</a>
				<a href="">
					<BsGithub className="text-2xl" />
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
