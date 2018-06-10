import React, { Component } from 'react'; 
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

export default class DishDetail  extends Component {
    constructor(props) {
        super(props);
    }
    render() {        
            if(this.props.dish != null) {
                return (   
                    <div className="row">         
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                                <CardBody>
                                    <CardTitle>{this.props.dish.name}</CardTitle>
                                    <CardText>{this.props.dish.description}</CardText>
                                </CardBody> 
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        
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
}
