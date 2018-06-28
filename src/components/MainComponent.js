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
import {addComment,fetchDishes} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders 
  }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
    fetchDishes : () => dispatch(fetchDishes()),
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  componentDidMount(){
    this.props.fetchDishes();
  }
  render() {
    const HomePage = () => {
      //console.log(this.props.leaders);
      return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
          dishesLoading={this.props.dishes.isLoading} 
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }
    const DishWithId = ({match}) => {
        return (
          <DishDetail addComment={this.props.addComment} 
          dish={this.props.dishes.dishes.filter((dish) => {return dish.id === parseInt(match.params.dishId,10)})[0]}
          isLoading={this.props.dishes.isLoading} 
          errMess={this.props.dishes.errMess}
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
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Redirect to="/home" />
          </Switch>         
          <Footer />
      </div>
    );
  }
}

console.log(connect);

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(Main)));
