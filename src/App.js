import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getDoc } from 'firebase/firestore'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// Styles and components
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import ContactPage from './pages/contact/contact.component'
import CheckoutPage from './pages/checkout/checkout.component'
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component'
import Header from './components/header/header.component'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        const snapShot = await getDoc(userRef)
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data(),
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    const { currentUser } = this.props
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route exact path='/checkout' element={<CheckoutPage />} />
          <Route
            path='/signin'
            element={
              currentUser ? (
                <Navigate to='/' replace />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Routes>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
