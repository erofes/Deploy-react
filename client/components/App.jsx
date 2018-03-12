import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

//import './App.less';
import HomeMenu from './HomeMenu.jsx';
import HomeList from './HomeList.jsx';

import axios from 'axios';

import validator from 'validator';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import Button from 'react-validation/build/button';

import qs from 'qs';


const required = (value) => {
    if (!value.toString().trim().length) {
        return <span style={{color: 'red'}}> required</span>;
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', list: '', fromMongo: '', got: [], title: '', status: '', priority: '', date: '', projects: [], items: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangePriority = this.handleChangePriority.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.fun = this.fun.bind(this);
        this.todos = this.todos.bind(this);
        //this.listNotes = this.listNotes.bind(this);
        this.listAllNotes = this.listAllNotes.bind(this);
        this.listAllWorks = this.listAllWorks.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImportProjects = this.handleImportProjects.bind(this);
        this.handleClickProject = this.handleClickProject.bind(this);
        this.addNewTODO = this.addNewTODO.bind(this);

        this.apiPrefix = `https://stormy-basin-40532.herokuapp.com`;
        this.apiPrefixWork = `https://stormy-basin-40532.herokuapp.com/work/`;
        this.apiPrefixNotes = `https://stormy-basin-40532.herokuapp.com/notes/`;

        this.store = createStore(this.todos);
        this.store.subscribe(() => {
            console.log('subscribe', this.store.getState());

            this.list = this.store.getState().map((item, index) => 
                <li key={index}>{item}</li>
            );

            this.setState({list: this.list});
            console.log(this.list);
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const newNote = qs.stringify({
        title: this.state.title,
            priority: this.state.priority,
            status: this.state.status,
            deadline: this.state.date
        })

        //console.log('Note: '+ newNote)
        axios.post(this.apiPrefixWork, newNote).then(({data}) =>
            console.log(data)
        ).catch(err =>
            console.error(err)
        );
    }

    addNewTODO(item) {
        const newNote = qs.stringify({
            title: item.content,
            priority: item.priority,
            status: "undone",
            deadline: item.date_added
        })

        //console.log('Note: '+ newNote)
        axios.post(this.apiPrefixWork, newNote).then(({data}) =>
            console.log(data)
        ).catch(err =>
            console.error(err)
        );
    }

    handleImportProjects(event) {
        event.preventDefault();

        const newNote = qs.stringify({
            token: "06932f2003195c4574708ee7ef69c164c123284f",
            resource_types: '["projects"]'
        })

        //console.log('Note: '+ newNote)
        axios.post(`https://todoist.com/api/v7/sync`, newNote).then(({data}) => {
            this.setState({projects: []})
            data.projects.map((item) => {
                //console.log(item)
                this.setState({projects: [...this.state.projects, item]});
            })
        }).catch(err =>
            console.error(err)
        );
    }

    handleClickProject(event) {
        event.preventDefault();
        const idSelectedProject = event.target.attributes.name.textContent;

        const newMsg = qs.stringify({
            token: "06932f2003195c4574708ee7ef69c164c123284f",
            resource_types: '["items"]'
        })

        axios.post(`https://todoist.com/api/v7/sync`, newMsg).then(({data}) => {
            this.setState({items: []})
            data.items.map((item) => {
                //console.log("item gotten: ");
                //console.log(item);
                if (item.project_id == idSelectedProject) {
                    this.setState({items: [...this.state.items, item]});
                    this.addNewTODO(item);
                }
            })
        }).catch(err =>
            console.error(err)
        );

        //console.log(event.target.attributes.name.textContent);
        //console.log("result: ");
        //console.log(this.state.items);
    }

    /*
    listNotes() {
        axios.get(apiPrefix+'/notes/5a97fa812eeaf906989a7da2').then(({ data }) => {
            //console.log( data )
            this.setState({fromMongo: data.text})
        })
        .catch(err =>
            alert( err )
        );
    }
    */

    listAllNotes() {
        axios.get(this.apiPrefixNotes).then(({ data }) => {
            data.map((item) => {
                this.setState({got: [...this.state.got, item]});
                //this.setState({allFromMongo: [this.state.allFromMongo, [item.text, item._id, item.title] ]})
                //console.log( this.state.got )
                //console.log( this.state.allFromMongo )
            })
        })
        .catch(err =>
            alert( err )
        );
    }

    listAllWorks() {
        axios.get(this.apiPrefixWork).then(({ data }) => {
            this.setState({got: []})
            data.map((item) => {
                this.setState({got: [...this.state.got, item]});
                //this.setState({allFromMongo: [this.state.allFromMongo, [item.text, item._id, item.title] ]})
                //console.log( this.state.got )
                //console.log( this.state.allFromMongo )
            })
        })
        .catch(err =>
            alert( err )
        );
    }

    todos(state = [], action) {
        if (action.type === 'ADD_TODO') {
            return [
                ...state,
                action.payload
            ];
        }
        return state;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        event.preventDefault();
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
        event.preventDefault();
    }

    handleChangePriority(event) {
        this.setState({priority: event.target.value});
        event.preventDefault();
    }

    handleChangeStatus(event) {
        this.setState({status: event.target.value});
        event.preventDefault();
    }

    handleChangeDate(event) {
        this.setState({date: event.target.value});
        event.preventDefault();
    }

    fun(event) {
        const todoName = this.state.value;
        this.state.value = '';
        this.store.dispatch({ type: 'ADD_TODO', payload: todoName });
    }

    render() {
        return <div className="dispatcher"> <HomeMenu>        
        </HomeMenu><br></br>
        <button className="addMyTodo" onClick={this.fun}>AddListener</button>
        <input className="inputMyTodo" value={this.state.value} onChange={this.handleChange}></input>
        {this.state.list}
        <button className="kid" onClick={this.listNotes}>ListAlert</button>
        <div>Got from mongo:
        {this.state.fromMongo}
        </div>
        <div>
        <button className="import_btn" onClick={this.handleImportProjects}>IMPORT PROJECTS</button>
            <div>
            Got all projects from todoist:
            {this.state.projects.map((item, index) => <li name={item.id} onClick={this.handleClickProject} key={index}>{item.name}</li>)}
            Responsed items:
            {this.state.items.map((item, index) => <li key={index}>{item.content}</li>)}
            </div>
        </div>
        <button className="optional" onClick={this.listAllWorks}>ListAllMyToDos</button>
        <div>Got all from mongo:
        {this.state.got.map((item, index) => <li key={index}>{item.title} {item.priority} {item.status} {item.deadline}</li>)}
        </div>
        <Form>
            <h3>Add todo</h3>
            <div>
                <label>
                    Title <Input onChange={this.handleChangeTitle} value={this.state.title} placeholder="Title" name='title' validations={[required]}/>
                </label>
                <label>
                    Priority <Input onChange={this.handleChangePriority} value={this.state.priority} placeholder="Priority" name='priority' validations={[required]}/>
                </label>
                <label>
                    Status <Input onChange={this.handleChangeStatus} value={this.state.status} placeholder="Stats" name='status' validations={[required]}/>
                </label>
                <label>
                    Date <Input onChange={this.handleChangeDate} value={this.state.date} placeholder="Date" name='deadline' validations={[required]}/>
                </label>
            </div>
            <div>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
        </Form>
        </div>;
    }
}

export default App;