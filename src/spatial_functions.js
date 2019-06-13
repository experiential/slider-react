
const Spatial = {

	equalPoints: function(point0, point1)
	{
		return point0[0] === point1[0] && point0[1] === point1[1];
	},

	pointsAreAdjacent: function(point0, point1)
	{
		return ( Math.abs(point0[0] - point1[0]) + Math.abs(point0[1] - point1[1]) === 1 );
	},

	getGridValueAtPoint: function(grid, point)
	{
		return grid[point[1]][point[0]];
	},

	setGridValueAtPoint: function(value, grid, point)
	{
		grid[point[1]][point[0]] = value;
	},

	swapGridValuesAtPoints: function(grid, point0, point1)
	{
		const value0 = this.getGridValueAtPoint(grid, point0);
		const value1 = this.getGridValueAtPoint(grid, point1);

		let newGrid = this.copyGrid(grid);

		this.setGridValueAtPoint(value1, newGrid, point0);
		this.setGridValueAtPoint(value0, newGrid, point1);

		return newGrid;
	},

	findValueInGrid: function(value, grid)
	{
		let valuePosition = null;
		grid.forEach( (row, y) => {
			row.forEach( (thisValue, x) => {
				if( thisValue == value ) { valuePosition = [x, y]; }
			});
		});

		return valuePosition;
	},

	copyGrid: function(grid)
	{
		return grid.map(row => row.map(value => value) ); // Clone the two-dimensional array
	},

	getGridSize: function(grid)
	{
		return [grid[0].length, grid.length];
	},

	getOriginalPosition: function(n, gridSize)
	{
		return [ n % gridSize[0], Math.floor(n / gridSize[0]) ];

	},

	scrambleGrid: function( grid )
	{
		// Get grid dimensions
		let gridSize = this.getGridSize(grid);

        // Encode moves as ints from 0-3, such that we can invert (xor with 3) the int value and get its opposite
        // move, i.e. up <-> down, left <-> right
        // So, moves are coded as: Up: 3 (11), Down: 0 (00), Left: 1 (01), Right: 2 (10)
        // That way we can always avoid cancelling the previous move
		let lastMove = 1; // Behave as though last move was 'down' so that the impossible initial 'up' move is ruled out
		let spacePosition = Spatial.findValueInGrid( 0, grid );
		for( let moveIndex = 0; moveIndex < 1000; moveIndex++ ) {

			// Pick a random move
			let thisMove = Math.floor( Math.random() * 3 ); // Three possible moves (that don't cancel out the last move)
			let oppositeMove = lastMove ^ 3;
			if( thisMove >= oppositeMove ) { thisMove += 1; }

			// Try to make the move
			let tilePosition = [...spacePosition];
			console.log("Move: " + thisMove );
			if( thisMove === 0 ) { // Down
				if( spacePosition[1] !== 0 ) {
					tilePosition[1] -= 1;
				}
			}
			if( thisMove === 1 ) { // Left
				if( spacePosition[0] !== gridSize[0] - 1 ) {
					tilePosition[0] += 1;
				}
			}
			if( thisMove === 2 ) { // Right
				if( spacePosition[0] !== 0 ) {
					tilePosition[0] -= 1;
				}
			}
			if( thisMove === 3 ) { // Up
				if( spacePosition[1] !== gridSize[1] - 1 ) {
					tilePosition[1] += 1;
				}
			}

			if( !tilePosition.every( ( x, i ) => x === spacePosition[i] ) ) {
				console.log("Swapping ", spacePosition, " with ", tilePosition);
				grid = Spatial.swapGridValuesAtPoints( grid, spacePosition, tilePosition );
				spacePosition = tilePosition;
				lastMove = thisMove;
			}
		}

		return grid;
	}

};

export { Spatial };

