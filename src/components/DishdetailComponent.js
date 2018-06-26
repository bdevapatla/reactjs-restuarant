import React, {Component} from 'react'; 
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(event) {
        console.log(event);
        this.setState({isModalOpen: !this.state.isModalOpen});
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating,values.authorName,values.comment);
    }
    render(){
        const ratingOptions = [1,2,3,4,5].map((i,index) => {
                return <option key={i} value={i}>{i}</option>
            });

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment   
                </Button> 
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>                          
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"                                      
                                        className="form-control" >
                                       {ratingOptions}
                                     </Control.select>                                  
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="authorName" md={12}>Your Name</Label>                          
                                <Col md={12}>
                                    <Control.text model=".authorName" id="authorName" name="authorName"                                      
                                        className="form-control"
                                        placeholder="Your Name"
                                        validators={{
                                            required,maxLength:maxLength(15),minLength:minLength(2)
                                        }} />
                                     
                                    <Errors
                                        className="text-danger"
                                        model=".authorName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>                          
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"                                      
                                        className="form-control"
                                        rows="8"                                       
                                        validators={{
                                            required
                                        }} />
                                     
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>                           
            </div>
        )
    }
}

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody> 
        </Card>);
}


function RenderComments({comments,addComment,dishId}) {
    if(comments != null) {
        const mappedComments =  comments.map(comment => {
                            return (
                                <li key={comment.id}>
                                    {comment.comment} <br/><br/>
                                    --{comment.author} {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))} <br/> <br/>
                                </li> 
                            )
                        });
        return (
                <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {mappedComments}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
                </div>);
}
    else {
        return (
            <div>           
            </div>);
    }
}

const DishDetail = (props) => {    
    if(props.dish != null) {
        return (   
            <div className="container">
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                   </div>
                <div className="row">         
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} 
                            addComment={props.addComment} 
                            dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        )
    }            
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;