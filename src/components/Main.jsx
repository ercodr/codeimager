import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	dark,
	a11yDark,
	atomDark,
	coldarkDark,
	dracula,
	duotoneDark,
	funky,
	oneDark,
	pojoaque,
	xonokai,
	vscDarkPlus,
	twilight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const Main = () => {
	const themesStr = [
		"dark",
		"a11yDark",
		"atomDark",
		"coldarkDark",
		"dracula",
		"duotoneDark",
		"funky",
		"oneDark",
		"pojoaque",
		"xonokai",
		"vscDarkPlus",
		"twilight",
	];
	const themes = [
		dark,
		a11yDark,
		atomDark,
		coldarkDark,
		dracula,
		duotoneDark,
		funky,
		oneDark,
		pojoaque,
		xonokai,
		vscDarkPlus,
		twilight,
	];
	const [langServer, setLangServer] = useState("python");
	const [code, setCode] = useState("");
	const [theme, setTheme] = useState(themes[0]);
	const inputRef = useRef(null);

	useEffect(() => {
		console.log(langServer);
	}, [langServer]);

	const toImage = useRef(null);

	const onSaveClick = () => {
		if (code === "") {
			return;
		}

		toPng(toImage.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement("a");
				link.download = "code image.png";
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		// Reset height - important to shrink on delete
		inputRef.current.style.height = "inherit";
		// Set height
		inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
	}, [code]);

	return (
		<main className="container mx-auto my-8 space-y-8">
			<section className="flex justify-between flex-col gap-4 sm:flex-row p-4 lg:p-0">
				<select
					defaultValue={"default"}
					onChange={(e) => {
						setLangServer(() => e.target.value);
					}}
					className="text-slate-900 outline-none px-4 py-2 rounded appearance-none"
				>
					<option
						value={"default"}
						disabled
					>
						Choose Language Server
					</option>
					<option value="python">Python</option>
					<option value="javascript">JavaScript</option>
					<option value="HTML">HTML</option>
				</select>
				<select
					onChange={(e) => setTheme(themes[e.target.value])}
					className="appearance-none rounded px-4 text-slate-900 outline-none"
				>
					{themesStr.map((item, index) => (
						<option
							key={item}
							value={index}
						>
							{item}
						</option>
					))}
				</select>
				<button
					onClick={onSaveClick}
					className={`px-4 py-2 rounded select-none ${
						code === "" ? "bg-slate-600 cursor-not-allowed" : "bg-blue-600"
					}`}
				>
					Save Image
				</button>
			</section>

			<section className="text-slate-900 flex gap-4 flex-col p-4 lg:p-0 lg:flex-row">
				<textarea
					ref={inputRef}
					placeholder="Paste your code here..."
					onChange={(e) => {
						setCode(() => e.target.value);
					}}
					className="w-full appearance-none resize-none bg-slate-100 rounded outline-none p-8 scrollbar-thin"
				></textarea>
				<div
					ref={toImage}
					className="w-full rounded bg-gradient-to-tr from-blue-100 via-blue-50 to-blue-100 p-6"
				>
					<div className="bg-black rounded w-full shadow-lg">
						<div className="[&>*]:w-3 [&>*]:h-3 [&>*]:rounded-full flex gap-2 p-6 rounded">
							<div className="bg-red-500"></div>
							<div className="bg-amber-500"></div>
							<div className="bg-green-500"></div>
						</div>
						<div className="p-4">
							<SyntaxHighlighter
								style={theme}
								language={langServer}
							>
								{code}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Main;
