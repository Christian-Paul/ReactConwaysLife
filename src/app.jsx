import React from 'react';
import ReactDOM from 'react-dom';
import './style.sass';

var Cell = React.createClass({
	getInitialState: function() {
		return {status: Math.floor(Math.random()*2)};
	},
	toggleStatus: function() {
		this.setState({status: this.state.status ? 0 : 1});
	},
	render: function() {
		return (
			<div className={'cell' + this.state.status} onClick={this.toggleStatus}></div>
		)
	}
});

var GameBoard = React.createClass({
	render: function() {
		return (
			<div className='gameboard'>
				<Cell />
			</div>
		)
	}
});

ReactDOM.render(<GameBoard />, document.getElementById('main'));