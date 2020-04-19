/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { FaCode } from 'react-icons/fa';
import Layout from '../layout/Layout';
import { IS_DEV } from '../../constants';

const KEY_DEV_LOGIN = 'devlogin';
const DEV_LOGIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmQ2NzMxZS1mMzAxLTQzNzMtOTdmNC1jYmRkOGMyNmY1OGIiLCJpYXQiOjE1ODEzMjc4MDYsImV4cCI6MTU4NjUxMTgwNn0.LmOcJ7jIji4m-4P2w99wjjTZtpq5hKedTFp5Ww4VWIM';

function DevAuth(props) {
  const [auth, setAuth] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    const sessionAuth = sessionStorage.getItem(KEY_DEV_LOGIN);
    setAuth(sessionAuth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    // console.log("submit", email, password);
    if (email === 'developer@example.com' && password === 'password') {
      sessionStorage.setItem(KEY_DEV_LOGIN, DEV_LOGIN_TOKEN);
      setAuth(DEV_LOGIN_TOKEN);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect Email or Password');
      setPassword('');
    }
  };

  return (
    <div>
      {
        IS_DEV && auth !== DEV_LOGIN_TOKEN ? (
          <div className="ui login_mobile">
            <div className="content">
              <img src="/static/assets/logo.png" alt="Smart Resume" style={{ margin: '20px auto 20px', width: '150px' }}/>
              <h1 className="login_modal__head" style={{color: '#555'}}>Login To Proceed</h1>
              {/* <img className="userFilled" src="/static/assets/userFilled.svg" /> */}
              <div className="userFilled">
                <FaCode color={"#555"} size={30} style={{ margin: 'auto', display: 'block' }} />
              </div>
              <form className="ui form login_modal__form" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>

                <div className="field">
                  <label htmlFor="email">EMAIL</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div style={{ color: 'red' }}>{errorMessage}</div>
                <button className="ui button accent-btn login-btn" type="submit">
                Continue
                </button>

              </form>
            </div>
          </div>
        ) : props.children
      }
    </div>
  );
}

export default DevAuth;
