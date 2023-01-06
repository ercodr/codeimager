import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function Code() {
	const [code, setCode] = useState("");

	const handleChange = (event) => {
		setCode(event.target.value);
	};

	return (
		<>
			<textarea
				value={code}
				onChange={handleChange}
			/>
			<SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>
		</>
	);
}

export default Code;
