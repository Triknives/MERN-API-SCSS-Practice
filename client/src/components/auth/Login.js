import React, {Fragment, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';

 const Login = () => {
    const [formData, setFormData] = useState({
        name:' ',
        email:' ',
        password:' ',
        password2: ' '
    });

    const {email, password, password2} = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            console.log('Passwords do not match');  
        }else {
            console.log('SUCCESS')
        }
    };

    return (
<Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
    )
}
export default Login;
