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
import {postComment,fetchDishes,fetchComments,fetchPromos,fetchLeaders,postFeedback} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders 
  }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
    fetchDishes : () => dispatch(fetchDishes()),
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback:({firstname,lastname,telnum,email,agree,contactType,message}) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))
});

class Main extends Component {
  componentDidMount(){
    console.log('Call made to fetchDishes')

    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    console.log('Call made to fetchLeaders')
    this.props.fetchLeaders();
  }
  render() {
    const HomePage = () => {
      console.log('Home: ', this.props.dishes.isLoading);
      return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
          dishesLoading={this.props.dishes.isLoading} 
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading} 
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading} 
          leadersErrMess={this.props.leaders.errMess} />
      );
    }
    const DishWithId = ({match}) => {
        return (
          <DishDetail  
          dish={this.props.dishes.dishes.filter((dish) => {return dish.id === parseInt(match.params.dishId,10)})[0]}
          isLoading={this.props.dishes.isLoading} 
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => {return comment.dishId === parseInt(match.params.dishId,10)})} 
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          />
        );
    };


    return (
      <div>
         <Header />
         <TransitionGroup>
           <CSSTransition key={this.props.location.key} classNames="page" timeout="300">
            <Switch>
                  <Route path='/home' component={HomePage} />
                  <Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} onClick={()=>{console.log("onCLick is yet to be defined.");}} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                  <Redirect to="/home" />
              </Switch>
          </CSSTransition>
          </TransitionGroup>        
          <Footer />
      </div>
    );
  }
}

console.log(connect);

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(Main)));
