import React, { Component } from 'react'
import './Tasks.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';


export class Tasks extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks: []
        };
    }
    
    componentDidMount(){
        fetch('/api/getAllTasks')
            .then(res => res.json())
            .then(tasks => this.setState({tasks} , () => console.log('customer fethed...' , tasks) ));
    }

    deleteTask(data){
        axios.post('/api/deleteTask', {
            id: data
          })
          .then((response) => {
            window.location.reload();
          }, (error) => {
            console.log(error);
          });
    }

    markAsNotDone(data){
        console.log(data);
        axios.get(`/api/markAsNotDone/?id=${data}`)
        .then(response => {
            this.setState({redirect: true});
            window.location.reload();
        }).catch(err => console.log(err));

        
       
    }

    markAsDone(data){
        console.log(data);
        axios.get(`/api/markAsDone/?id=${data}`)
        .then(response => {
            this.setState({ redirect: true });
            window.location.reload();
        }).catch(err => console.log(err));
    }
    render() {

        return (
            <div className="container" >

                <h1 className="text-center p-4">Tasks</h1>

                
                <div>
                <Link className="d-block text-right" to="/createnewtask"><Button className="text-right my-3" variant="primary" type="submit">Create new task</Button></Link>
                    <Row className="bg-info text-white m-0">
                        <Col xs="auto" md="auto" className="task_header d-md-inline text-center p-3 font-weight-bold">#</Col>
                        <Col xs="7" md="4" className="task_header text-left p-3 font-weight-bold">Task Name</Col>
                        <Col   className="task_header d-none d-md-inline text-left p-3 font-weight-bold">Created date</Col>
                        <Col xs="2" md="1" className=" task_header d-none d-md-inline text-center p-3 font-weight-bold">Preview</Col>
                        <Col xs="2" md="1" className=" d-none d-md-inline task_header text-center p-3 font-weight-bold">Edit</Col>
                        <Col xs="2" md="1" className=" d-none d-md-inline task_header text-center p-3 font-weight-bold">Done</Col>
                        <Col xs="2" md="1" className=" d-none d-md-inline task_header text-center p-3 font-weight-bold">Delete</Col>
                        <Col xs="3" className=" d-md-none task_header text-center p-3 font-weight-bold">Options</Col>
                    </Row>
                    {this.state.tasks.map((task,i) => {
                                return(
                                    <Row key={task.id} className="align-items-center m-0">
                                        <Col xs="auto" md="auto" className="fields_css d-md-inline p-3 font-weight-bold ">#{ i + 1 }</Col>
                                        <Col  xs="7" md="4" className="fields_css text-left p-3"><Link className="text-dark " to={`/previewtask/${task.id}`} > { task.name }</Link></Col>
                                        <Col  className="fields_css p-3 d-none d-md-inline text-left">
                                            { 
                                               new Date(task.date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})
                                            }
                                        </Col>

                                        <Col xs="2" md="1" className=" p-3 d-none d-md-inline text-center">
                                            <Link to={`/previewtask/${task.id}`} >
                                                <i className="icons_css fa fa-eye fa-2x  privew" aria-hidden="true"></i>
                                            </Link>
                                        </Col>

                                        <Col xs="2" md="1" className="d-none d-md-inline  p-3 text-center">                                    
                                            <Link to={`/edittask/${task.id}`} >
                                                <i className="icons_css fa fa-pencil-square-o fa-2x text-warning" aria-hidden="true"></i>
                                            </Link>
                                        </Col>

                                        <Col xs="2" md="1" className="d-none d-md-inline p-3 text-center"> { !task.done ? <i className="privew icons_css fa fa-2x fa-times-circle text-danger" onClick={this.markAsDone.bind(this, task.id)}  aria-hidden="true"></i> : <i className=" privew icons_css fa fa-2x text-success fa-check-circle" onClick={this.markAsNotDone.bind(this, task.id)} aria-hidden="true"></i>  }</Col>

                                        <Col xs="2" md="1" className="d-none d-md-inline p-3 text-center"><i style={{cursor:'pointer'}} onClick={this.deleteTask.bind(this, task.id)} className="icons_css fa fa-trash fa-2x text-danger"  aria-hidden="true"></i></Col>

                                        <Col xs="3" className="d-md-none">
                                        <Link className="pr-3" to={`/edittask/${task.id}`} >
                                                <i className="icons_css fa fa-pencil fa-2x text-warning" aria-hidden="true"></i>
                                            </Link>



                                            <i style={{cursor:'pointer'}} onClick={this.deleteTask.bind(this, task.id)} className=" icons_css fa fa-trash fa-2x text-danger"  aria-hidden="true"></i>
                                        </Col>
                                    </Row>
                    )})}
               </div>
            </div>
        );
    }
}



export default Tasks;
