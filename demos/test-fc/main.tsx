import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(10);
	return (
		<div
			onClickCapture={() => {
				setNum(num + 100);
				setNum(num + 100);
				setNum((n) => n + 100);
			}}
		>
			{num}
		</div>
	);
}
function Child() {
	return <span>big-react</span>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
