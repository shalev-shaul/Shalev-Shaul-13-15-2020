import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import './EditTask.css';
import {Link} from 'react-router-dom';






export class EditTask extends Component {

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
       this.getTaskById();
    }

    getTaskById(){
        const { match: { params } } = this.props;
        axios.get(`/api/getTaskById/?id=${params.userId}`)
        .then(response => {
                let date =  new Date(response.data[0].date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})
                this.setState({ 
                    id: response.data[0].id,
                    name: response.data[0].name,
                    text: response.data[0].text,
                    date: date,
                    created_by: response.data[0].created_by,
                    done: response.data[0].done
                }, () =>{
                    console.log(this.state);
                })
        })
    }

    updateTask(e){
        e.preventDefault();
        axios.post(`/api/updateTask`, {
            id: this.state.id,
            name: this.state.name,
            text: this.state.text
          })
        .then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));


    }

    markAsNotDone(e){
        e.preventDefault();
        axios.get(`/api/markAsNotDone/?id=${this.state.id}`)
        .then(response => {
            this.setState({redirect: true});
            this.props.history.push('/');
        }).catch(err => console.log(err));

        
       
    }

    markAsDone(e){
        e.preventDefault();
        axios.get(`/api/markAsDone/?id=${this.state.id}`)
        .then(response => {
            this.setState({ redirect: true });
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }

    handleNameChange(e){
        this.setState({name: e.target.value});
    }

    handleTextChange(e){
        this.setState({text: e.target.value});
    }

    render() {

        return (
           

            
            <Container>
                <h1 className="text-center p-4" >Edit Task</h1>
                <div className="wrap_form">
                    <Form>
                        <Row>
                            <Col>
                                { !this.state.done ? 
                                <Button onClick={this.markAsDone.bind(this)} className="float-right mb-3" variant="success" type="submit">
                                    Mark as completed
                                </Button>
                                : 
                                <Button onClick={this.markAsNotDone.bind(this)} className="float-right mb-3" variant="danger" type="submit">
                                    Mark as Not completed
                                </Button>
                                }                    

                            </Col>
                            
                        </Row>

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

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Date created:</Form.Label>
                            <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={this.state.date} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Task done:</Form.Label>
                            <Col sm="10">
                            {this.state.done === true ? <i className="fa fa-2x text-success fa-check-circle" aria-hidden="true"></i> : <i className="fa fa-2x fa-times-circle text-danger" aria-hidden="true"></i>}
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
                                <Button onClick={this.updateTask.bind(this)} className="float-right" variant="primary" type="submit">
                                    Save
                                </Button>
                            </Col>
                            
                        </Row>

                    </Form>
                </div>
                
            </Container>
        )
    }
}

export default EditTask
