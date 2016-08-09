import React from 'react';
import ReactDOM from 'react-dom';
import './style.sass';

var LivingCell = React.createClass({
	sayPosition: function() {
		console.log(this.props.x)
		console.log(this.props.y)
	},
	render: function() {
		return (
			<div className={'living-cell'} onClick={this.changeStatus}></div>
		)
	}
});

var DeadCell = React.createClass({
	sayPosition: function() {
		console.log(this.props.x)
		console.log(this.props.y)
	},
	render: function() {
		return (
			<div className={'dead-cell'}></div>
		)
	}
});

var GameBoard = React.createClass({
	getInitialState: function() {
		return {board: this.makeRandomArray(10, 10)}
	},
	toggleCellStatus: function(x, y) {
		var board = this.state.board;
		board[y][x] = board[y][x] ? 0 : 1;
		this.setState({board: board})
	},
	getLivingNeighbors: function(board) {
		var height = board.length;
		var width = board[0].length;
		var neighborBoard = this.makeEmptyArray(height, width);

		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				// if the cell is alive
				if(board[i][j]) {
					if(i > 0) {
						neighborBoard[i-1][j]++;
						if(j > 0) {
							neighborBoard[i-1][j-1]++;
						}
						if(j < width-1) {
							neighborBoard[i-1][j+1]++
						}
					}
					if(i < height-1) {
						neighborBoard[i+1][j]++;
						if(j > 0) {
							neighborBoard[i+1][j-1]++;
						}
						if(j < width-1) {
							neighborBoard[i+1][j+1]++
						}
					}
					if(j > 0) {
						neighborBoard[i][j-1]++;
					}
					if(j < width-1) {
						neighborBoard[i][j+1]++;
					}
				}
			}
		}
		return neighborBoard;
	},
	getCellFate: function(cell, neighbors) {
		if(cell) {
			if(neighbors < 2) {
				return 0;
			} else if (neighbors > 3) {
				return 0;
			} else {
				return 1;
			}
		} else {
			if(neighbors === 3) {
				return 1;
			} else {
				return 0;
			}
		}
	},
	getNextBoard: function(oldBoard, neighborBoard) {
		var height = oldBoard.length;
		var width = oldBoard[0].length;
		var nextBoard = this.makeEmptyArray(height, width);

		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				nextBoard[i][j] = this.getCellFate(oldBoard[i][j], neighborBoard[i][j])
			}
		}

		return nextBoard;
	},
	updateBoard: function() {
		this.setState({board: this.getNextBoard(this.state.board, this.getLivingNeighbors(this.state.board))})
	},
	makeEmptyArray: function(H, W) {
		var arr = [];
		if(H > 1) {
			for(var i = 0; i < H; i++) {
				arr.push(this.makeEmptyArray(1, W));
			};
		} else {
			for(var j = 0; j < W; j++) {
				arr.push(0);
			}
		}
		return arr;
	},
	clearBoard: function() {
		this.setState({board: this.makeEmptyArray(10, 10)})
	},
	makeRandomArray: function (H, W) {
		var arr = [];
		if(H > 1) {
			for(var i = 0; i < H; i++) {
				arr.push(this.makeRandomArray(1, W));
			};
		} else {
			for(var j = 0; j < W; j++) {
				arr.push(Math.floor(Math.random()*2));
			}
		}
		return arr;
	},
	randomizeBoard: function() {
		this.setState({board: this.makeRandomArray(10, 10)})
	},
	render: function() {
		return (
			<div className='gameboard'>
				{
					this.state.board.map(function(subarray, i) {
						return (
							<div className='row' key={i}>{subarray.map(function(item, j) {
								if(item) {
									return <LivingCell key={j} x={j} y={i} />
								} else {
									return <DeadCell key={j} x={j} y={i} />
								}
							})}</div>
						)
					})
				}
				<div onClick={this.randomizeBoard} className='button'>Randomize</div>
				<div onClick={this.clearBoard} className='button'>Clear</div>
				<div onClick={this.updateBoard} className='button'>Next</div>
			</div>
		)
	}
});

ReactDOM.render(<GameBoard />, document.getElementById('main'));