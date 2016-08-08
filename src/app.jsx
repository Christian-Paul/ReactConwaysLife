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
	getLivingNeighbors: function() {

	},
	getNextBoard: function() {

	},
	updateBoard: function() {

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
			</div>
		)
	}
});

ReactDOM.render(<GameBoard />, document.getElementById('main'));