import React from 'react';

import Board from './Board';



const App = () => {
	return (
		<div className="ui container">
			<div className="ui header" style={{padding: "100px 0px", textAlign:"center"}}>
				<h1>Slider!</h1>
			</div>
			<div className="ui center aligned grid">
				<Board/>
			</div>
		</div>
	);
}

export default App;