import React from 'react';
import AppBar from './AppBar'
import {BrowserRouter, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import UserProfilePage from './Pages/UserProfilePage'
import SearchPage from './Pages/SearchPage'
import RestaurantPage from './Pages/RestaurantPage'
import AddReviewPage from './Pages/AddReviewPage'
import EditReviewPage from './Pages/EditReviewPage'

class App extends React.Component {

    render() {
        return (
            <div>
                <AppBar history={this.props.history}/>
                <BrowserRouter>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/sign-in/" component={SignInPage}/>
                    <Route path="/sign-up" component={SignUpPage}/>
                    <Route path="/profile/:username" component={UserProfilePage}/>
                    <Route path="/search/:tab?/:query?" component={SearchPage}/>
                    <Route path="/restaurant/:name" component={RestaurantPage}/>
                    <Route path="/addReview/:name" component={AddReviewPage}/>
                    <Route path="/editReview/:id" component={EditReviewPage}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;