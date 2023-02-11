import {Component} from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

// import {Redirect} from 'react-router-dom'
import './index.css'

// login credentials

/* henry,henry_the_deve
david,the_miller@23
robert,wilsonRobert45
rahul,rahul@2021
praneetha,praneetha@2021
mosh,DevMosh22 
*/

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  /*

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login/'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (data.jwt_token !== undefined) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  } */

  submitForm = event => {
    event.preventDefault()
    const {username, password} = this.state
    let ExistingUsers = JSON.parse(localStorage.getItem('List'))
    if (ExistingUsers === null) {
      ExistingUsers = []
    }
    const item = {username, password}
    const result = ExistingUsers.find(
      each => JSON.stringify(each) === JSON.stringify(item),
    )
    console.log(result)
    if (result === false) {
      this.setState({
        showSubmitError: true,
        errorMsg: 'user Does not Exits Please SignUp',
        username: '',
        password: '',
      })
    } else if (result === undefined) {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Please provide valid password or username',
        username: '',
        password: '',
      })
    } else {
      const {history} = this.props
      history.replace('/')
    }
  }

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserField = () => {
    const {username} = this.state
    return (
      <>
        <label className="" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input"
          placeholder="username"
          value={username}
          onChange={this.onchangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          className="username-input"
          value={password}
          onChange={this.onchangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            className="logo"
            src="https://i.postimg.cc/zDgYHJ2B/Flipkart-Image.jpg"
            alt="logo"
          />
          <br />
          <h1 className="flipkart">flipkart</h1>
        </div>
        <div className="form-container">
          <form onSubmit={this.submitForm} className="submit-form">
            <div>{this.renderUserField()}</div>

            <div> {this.renderPasswordField()}</div>
            <button className="login-button" type="submit">
              Login
            </button>
            <Link to="/signup">
              <p>sign Up</p>
            </Link>

            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
