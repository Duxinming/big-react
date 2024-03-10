import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(10);

	const arr =
		num % 2 === 0
			? [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>]
			: [<li key="3">3</li>, <li key="2">2</li>, <li key="1">1</li>];
	return (
		<ul onClick={() => setNum((n) => n + 1)}>
			<>
				<li>1</li>
				<li>2</li>
			</>
			<li>3</li>
			<li>4</li>
			{arr}
		</ul>
	);
}
function Child() {
	return <span>big-react</span>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
