import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class SignUpPage extends Component {
  state = {
    username: '',
    password: '',
    userList: [],
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  setLocal = () => {
    const {userList} = this.state
    console.log(userList)
    const item = userList[userList.length - 1]
    let ExistingUsers = JSON.parse(localStorage.getItem('List'))

    console.log(ExistingUsers)
    if (ExistingUsers === null) {
      ExistingUsers = []
    }

    const UserExists = ExistingUsers.some(
      each => each.username === item.username,
    )

    if (
      UserExists === false &&
      item.password.length >= 8 &&
      item.username.length !== 0
    ) {
      localStorage.setItem('List', JSON.stringify(userList))
      this.setState({errorMsg: 'SignUp Successful', showSubmitError: true})
      this.setState({username: '', password: ''})
    } else if (item.password.length === 0 || item.username.length === 0) {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Please Provide valid username and password',
      })
    } else if (UserExists === true && ExistingUsers.length !== 0) {
      this.setState({
        showSubmitError: true,
        errorMsg: 'User Already Exists',
      })
    } else {
      this.setState({
        showSubmitError: true,
        errorMsg: 'password length should be 8',
      })
    }
  }

  signUpdate = event => {
    event.preventDefault()

    const {username, password} = this.state

    //   this.setState(prevState => ({
    //     done: [...prevState.done, ...filteredDone],
    //    }))

    this.setState(
      prevState => ({
        userList: [...prevState.userList, {username, password}],
      }),

      this.setLocal,
    )
  }
  /*
  submitForm = event => {
    event.preventDefault()

    localStorage.setItem('userList', JSON.stringify(userList))
  } */

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="submit-container">
        <form className="submit-form-container" onSubmit={this.signUpdate}>
          <br />
          <div>{this.renderUsernameField()}</div>
          <br />
          <div>{this.renderPasswordField()}</div>
          <br />
          <button type="submit" className="login-button-submit">
            Sign Up
          </button>
          <br />

          <Link to="/login">
            <button type="button" className="login-button-submit">
              Login
            </button>
          </Link>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default SignUpPage
