import React from 'react';
import ReactDOM from 'react-dom';
import './style.sass';

var LivingCell = React.createClass({
	changeStatus: function() {
		this.props.toggleCellStatus(this.props.x, this.props.y);
	},
	render: function() {
		return (
			<div className={'living-cell'} onClick={this.changeStatus}></div>
		)
	}
});

var DeadCell = React.createClass({
	changeStatus: function() {
		this.props.toggleCellStatus(this.props.x, this.props.y);
	},
	render: function() {
		return (
			<div onClick={this.changeStatus} className={'dead-cell'}></div>
		)
	}
});

var GameBoard = React.createClass({
	getInitialState: function() {
		return {board: this.makeRandomArray(10, 10), generation: 0}
	},
	componentDidMount: function() {
		this.startPlaying();
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
		function checkIfSame(oldBoard, newBoard) {
			for(var i = 0; i < oldBoard.length; i++) {
				for(var j = 0; j < oldBoard[i].length; j++) {
					if(oldBoard[i][j] !== newBoard[i][j]) {
						return false;
					}
				}
			}
			return true;
		}
		this.setState({oldBoard: this.state.board});
		this.setState({board: this.getNextBoard(this.state.board, this.getLivingNeighbors(this.state.board))});
		this.setState({generation: ++this.state.generation});
		if(checkIfSame(this.state.oldBoard, this.state.board)) {
			clearInterval(this.state.stepInterval);
		}
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
		this.setState({board: this.makeEmptyArray(10, 10)});
		this.setState({generation: 0});
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
		this.setState({generation: 0});
	},
	startPlaying: function() {
		var stepInterval = window.setInterval(this.updateBoard, 100);
		this.setState({stepInterval: stepInterval});
	},
	stopPlaying: function() {
		clearInterval(this.state.stepInterval);
	},
	render: function() {
		return (
			<div className='gameboard'>
				{
					this.state.board.map(function(subarray, i) {
						return (
							<div className='row' key={i}>{subarray.map(function(item, j) {
								if(item) {
									return <LivingCell toggleCellStatus={this.toggleCellStatus} key={j} x={j} y={i} />
								} else {
									return <DeadCell  toggleCellStatus={this.toggleCellStatus} key={j} x={j} y={i} />
								}
							}, this)}</div>
						)
					}, this)
				}
				<div onClick={this.randomizeBoard} className='button'>Randomize</div>
				<div onClick={this.clearBoard} className='button'>Clear</div>
				<div onClick={this.updateBoard} className='button'>Next</div>
				<div onClick={this.startPlaying} className='button'>Start</div>
				<div onClick={this.stopPlaying} className='button'>Stop</div>
				<div className='generation'>Generation: {this.state.generation}</div>
			</div>
		)
	}
});

ReactDOM.render(<GameBoard />, document.getElementById('main'));