import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, Container, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Row } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () =>  {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }


    render() {
        return (
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Container>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"> 
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" rows="6" id="comment" name="comment"
                                        className="form-control"> 
                                    </Control.textarea>
                                </Row>
                                <Row className="form-group">
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                </Row>
                            </LocalForm>
                        </Container>
                    </ModalBody>
                </Modal>
                <Button onClick={this.toggleModal}><span className="fa fa-pencil"></span>{'  '}
                    Submit Comment</Button>
            </>
        )
    }

}

class DishDetail extends Component {

    renderDish(dish){
        if(dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    renderComments(comments){
        if(comments == null){
            return (<div></div>);
        }
        const comnts = comments.map(comment => {
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            );
        })

        return (
            <div className="Container">
                <div className="col-12 m-1">
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {comnts}
                    </ul>
                    <CommentForm />
                </div>
            </div>
        );
    }

    render(){
        const dish = this.props.dish
        const comment = this.props.comments
        if(dish == null){
            return(
                <div></div>
            );
        }
        const dishItem = this.renderDish(dish)
        const commentItem = this.renderComments(comment)
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12"> 
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {dishItem}
                    {commentItem}
                </div>
            </div>
        );
    }
}

export default DishDetail;
