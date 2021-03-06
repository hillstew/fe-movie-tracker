import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { loginUser, populateFavorites } from '../../actions';
import { postData } from '../../api/api';
import { Redirect, Link } from 'react-router-dom';
import { getFavorites } from '../../utils/helper';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: ''
    }
  }
  
handleChange = (event) => {
  const { name, value } = event.target
  this.setState({
    [name]: value
  })
}


 handleFavorites = async (id) => {
  let favoriteMovieIDs = await getFavorites(id)
  this.props.populateFavorites(favoriteMovieIDs)
  }


handleSubmit = async (event) => {
  const { email, password } = this.state;
  event.preventDefault();
  try {
    let currentUser = await postData('', { email, password })
    currentUser = {
      id: currentUser.data.id,
      name: currentUser.data.name,
      favorites: [],
      status: currentUser.status
    }
    this.props.loginUser(currentUser)
    await this.handleFavorites(currentUser.id)
    this.setState({ status: currentUser.status })
  } catch {
    this.setState({ status: 'error' })
  }
}

  render() {
    const { email, password, status } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          onChange={this.handleChange}
          name="email"
          value={email}
          placeholder="email"
        />
        <input
          onChange={this.handleChange}
          name="password"
          type="password"
          value={password}
          placeholder="password"
        />
        <button>Login</button>
        {status === "error" && <p>Email and password do not match</p>}
        {status === "success" && <Redirect to="/" />}
        <Link className="link" to="/signup">
          Sign Up
        </Link>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
  populateFavorites: (favorites) => dispatch(populateFavorites(favorites))
})

export default connect(null, mapDispatchToProps)(Login)

Login.propTypes = {
  populateFavorites: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
}