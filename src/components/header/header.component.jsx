import React from 'react'
import './header.styles.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link, useLocation } from 'react-router-dom'

// components
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { auth } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

const Header = ({ currentUser, hidden }) => {
  const pathname = useLocation().pathname

  return (
    <div className="header">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link
          className={`${pathname === '/shop' ? 'active' : ''} option`}
          to="shop"
        >
          Shop
        </Link>
        <Link
          className={`${pathname === '/contact' ? 'active' : ''} option`}
          to="contact"
        >
          Contact
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            Sign Out
          </div>
        ) : (
          <Link
            className={`${pathname === '/signin' ? 'active' : ''} option`}
            to="signin"
          >
            Sign In
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
})

export default connect(mapStateToProps)(Header)
