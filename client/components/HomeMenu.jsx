import React from 'react';
import ReactDOM from 'react-dom';

import './HomeMenu.less';

class HomeMenu extends React.Component {


	/*render() {
		return (
			<div className="Note">
				<span>New one is here, again!</span>
				<input type="button" value="Ok!" onClick={this.myFunction} />
				<Input type='password' name='password' name='test-input' onChange={this.statetest} validations={[required]} />
			</div>
		);
	}*/

    /*
	render() {
        return <Form>
            <h3>Login</h3>
            <div>
                <label>
                    Email*
                    <Input value='email@email.com' name='email' validations={[required]}/>
                </label>
            </div>
            <div>
                <label>
                    Password*
                    <Input type='password' name='password' validations={[required]}/>
                </label>
            </div>
            <div>
                <Button>Submit</Button>
            </div>
        </Form>;
    }
    */
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.fun = this.fun.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        event.preventDefault();
    }

    fun() {
        const todoName = this.state.value;
        console.log('todoName', todoName);
    }

    render() {
        return <div className="HomeMenu">
            <button>Показать все "To do"</button><br></br>
            <button className="addTodo" onClick={this.fun}>Добавить новую "To do"</button>
            <input className="inputTodo" value={this.state.value} onChange={this.handleChange}></input><br></br>
            <button>Импорт "To do" из "Todoist"</button>
        </div>;
    };
}

export default HomeMenu;