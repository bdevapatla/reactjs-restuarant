import React, { Component } from 'react';
import Menu from './MenuComponent';

import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Contact  from './ContactComponent.js';
import About from './AboutComponent.js';
import { connect } from 'react-redux';
import {addComment} from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders 
  }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment))
});

class Main extends Component {
  render() {
    const HomePage = () => {
      return(
          <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} 
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)} />
      );
    }
    const DishWithId = ({match}) => {
        return (
          <DishDetail addComment={this.props.addComment} dish={this.props.dishes.filter((dish) => {return dish.id === parseInt(match.params.dishId,10)})[0]}
          comments={this.props.comments.filter((comment) => {return comment.dishId === parseInt(match.params.dishId,10)})} 
          />
        );
    };


    return (
      <div>
         <Header />
         <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} onClick={()=>{console.log("onCLick is yet to be defined.");}} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />
              <Redirect to="/home" />
          </Switch>         
          <Footer />
      </div>
    );
  }
}

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(Main)));
