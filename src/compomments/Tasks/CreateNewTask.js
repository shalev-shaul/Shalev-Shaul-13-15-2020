import React, { Component } from 'react';

import './previewTask.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

import {Link} from 'react-router-dom';



export class CreateNewTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            id: '',
            name: '',
            text: '',
            date: '',
            created_by: '',
            done: ''
        };
        
       
    }

      
    componentDidMount(){
    }

    handleNameChange(e){
        this.setState({name: e.target.value});
    }

    handleTextChange(e){
        this.setState({text: e.target.value});
    }


    createNewTask(e){
        e.preventDefault();
        axios.post(`/api/createNewTask`, {
            name: this.state.name,
            text: this.state.text
          })
        .then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));


    }
    render(){
        return(
            <Container>
                <h1 className="text-center p-4">Create Task</h1>
                <div className="wrap_form">
                    <Form>

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Task name:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={this.handleNameChange.bind(this)} name="name" placeholder="Enter task name...."  defaultValue={this.state.name} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Task content:</Form.Label>
                            <Col sm="10">
                                <Form.Control name="text" onChange={this.handleTextChange.bind(this)} type="textarea" placeholder="Enter content...." defaultValue={this.state.text} />
                            </Col>
                        </Form.Group>


                        <Row>
                            <Col>
                                <Link className="text-white" to="/">
                                    <Button  className=""  variant="secondary">
                                        Back  
                                    </Button>
                                </Link>  
                            </Col>

                            <Col>                    
                                <Button onClick={this.createNewTask.bind(this)} className="float-right" variant="primary" type="submit">
                                    Create task
                                </Button>
                            </Col>
                            
                        </Row>

                    </Form>
            </div>
            
        </Container>
        )
    }

}

export default CreateNewTask