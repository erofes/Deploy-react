import React, { Component } from 'react';
import { connect } from 'react-redux';

class RduxChild extends Component {
	addTodo() {
		console.log('addTodo', this.todoInput.value);
		this.props.onAddTodo(this.todoInput.value);
		this.todoInput.value = '';
	}

	render() {
		console.log(this.props.testTodos);
		return (
			<div>
				<button onClick={this.addTodo.bind(this)}>Add Button</button>
				<input type="text" ref={(input) => {this.todoInput = input}}></input>
				<ul>
					{this.props.testTodos.map((item, index) =>
						<li key={index}>{item}</li>
					)}
				</ul>
			</div>
		);
	}
}

export default connect(
	state => ({
		testTodos: state.todos
	}), //MapState to props React component subscribe to store component
	dispatch => ({
		onAddTodo: (todoName) => {
			dispatch({type: 'ADD_TODO', payload: todoName});
		}
	})
)(RduxChild);

/*

export default connect(
	state => ({
		testStore: state
	}), //MapState to props React component subscribe to store component
	dispatch => ({
		onAddTodo: (todoName) => {
			dispatch({type: 'ADD_TODO', payload: todoName});
		}
	})
)(RduxChild);
*/