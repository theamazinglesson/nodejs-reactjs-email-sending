import React, { Component } from 'react';
import { Form, Input, Container, TextArea, Button } from 'semantic-ui-react';
import axios from 'axios';


class FormField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            subject: '',
            message: '',
            sent: false
        };



        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Submittions status: ${this.state}`);
        console.log(this.state);
        axios.post('http://localhost:4000/mail', {
            email: this.state.email,
            subject: this.state.subject,
            text: this.state.message
        })
            .then((res) => {
                this.setState({
                    sent: true
                });
                this.resetForm();
            }
            )
            .catch(err=>console.log(err));
    }


    // RESET INITIAL DATA
    resetForm = () => {
        this.setState({
            email: '',
            subject: '',
            message: ''
        });

        setTimeout(() => {
            this.setState({
                sent: false
            })
        }, 3000);
    }




    handleEmailChange = (e) => {
        console.log(`Email: ${e.target.value}`);
        this.setState({
            email: e.target.value
        });
    }
    handleSubjectChange = (e) => {
        console.log(`Subject: ${e.target.value}`);
        this.setState({
            subject: e.target.value
        });
    }
    handleMessageChange = (e) => {
        console.log(`Message: ${e.target.value}`);
        this.setState({
            message: e.target.value
        });
    }

    render() {
        return (
            <Container >
                <Form size="small" onSubmit={this.handleSubmit} >
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}
                            placeholder="Enter an email address"
                            label="To"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                        <Form.Field
                            control={Input}
                            placeholder="Subject for this email"
                            label="Subject"
                            value={this.state.subject}
                            onChange={this.handleSubjectChange}
                        />
                    </Form.Group>
                    <Form.Field
                        control={TextArea}
                        placeholder="Leave a message"
                        label="Message" rows='6'
                        value={this.state.message}
                        onChange={this.handleMessageChange}
                    />
                    <Form.Field>
                        <Button size="massive" color="blue" type="submit" onClick={() => console.log("form is submitted")} >Send</Button>
                    </Form.Field>
                </Form>
            </Container>
        )
    }
}

export default FormField;
