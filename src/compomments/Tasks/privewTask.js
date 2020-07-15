import React, { Component } from 'react';

import './previewTask.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

import {Link} from 'react-router-dom';



export class PreviewTask extends Component {


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

                this.setState({ 
                    id: response.data[0].id,
                    name: response.data[0].name,
                    text: response.data[0].text,
                    date: response.data[0].date,
                    created_by: response.data[0].created_by,
                    done: response.data[0].done
                }, () =>{
                    console.log(this.state);
                })
        })
    }

    render(){
        return(
            <Container>
                <h1 className="text-center p-4">Preview Task</h1>


                <Row className="wrap_row">
                    <Col className=" fields_css d-flex align-items-center font-weight-bold" xs="5" md="2">
                        <div className="header_row">Task name:</div>
                    </Col>

                    <Col xs="7" md="10">
                        <div className="fields_css">{this.state.name}</div>
                    </Col>
                </Row>

                <Row className="wrap_row">
                    <Col className=" fields_css d-flex align-items-center font-weight-bold" xs="5" md="2">
                        <div className="header_row">Task content:</div>
                    </Col>
                    <Col  xs="7" md="10">
                        <div className="fields_css">{this.state.text}</div>
                    </Col>
                </Row>

                <Row className="wrap_row">
                    <Col className=" fields_css d-flex align-items-center font-weight-bold" xs="5" md="2">
                        <div className="header_row">Date created:</div>
                    </Col>
                    <Col  xs="7" md="10">
                        <div className="fields_css">
                            {
                                                                           new Date(this.state.date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})
                            } 
                            </div>
                    </Col>
                </Row>

                <Row className="wrap_row">
                    <Col className=" fields_css d-flex align-items-center font-weight-bold" xs="5" md="2">
                        Task done:
                    </Col>

                    <Col xs="7" md="10">
                        {this.state.done ? <i className="fa fa-2x text-success fa-check-circle" aria-hidden="true"></i> : <i className="fa fa-2x fa-times-circle text-danger" aria-hidden="true"></i>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link className="text-white" to="/">
                            <Button  className="m-3"  variant="secondary">
                                Back   
                            </Button>
                        </Link>
                    </Col>

                    <Col> 
                        <Link className="text-white" to={`/edittask/${this.state.id}`}>                
                            <Button className="float-right m-3" variant="primary" type="submit">
                                Edit task  
                            </Button>
                        </Link> 
                    </Col>
                    
                </Row>
            </Container>
        )
    }
}

export default PreviewTask