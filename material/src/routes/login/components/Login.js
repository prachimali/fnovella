import React from 'react';
import PropTypes from 'prop-types'; //for user prop-types
import APPCONFIG from 'constants/Config'; //global variables
import TextField from 'material-ui/TextField'; //For use text
import QueueAnim from 'rc-queue-anim'; // admin use
import validateinput from '../../../actions/userLogin'; //First user validator
import { connect } from 'react-redux'; //to pass functions
import { userSignUpRequest } from '../../../actions/loginAxios'; //for use the Rest_API

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand,
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);  {/* Makes a Bind of the actions, onChange, onSummit */}
    this.onChange = this.onChange.bind(this);
  }

  isValid(){
    //local validation
    const { errors, isValid } = validateinput(this.state)
    if(!isValid){
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
      //reset errros object and disable submit button
      this.setState({ errors: {}, isLoading: true });

      //we store  a function in the props
        this.props.userSignUpRequest(this.state).then(
        (response) => {
          //Save the default object as a provider
          this.context.router.history.push('/');
        },
        (error) => {
          console.log("An Error occur with the Rest API");
          this.setState({ errors: error.response.data, isLoading: false });
        });

    } else {
      console.log(this.state.errors);
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state; //inicializate an get errors

    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <h1><img src="assets/images/logo.png" alt={this.state.brand} /></h1>
            </section>

            <form onSubmit={this.onSubmit} className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    name="email"
                    floatingLabelText="Correo electrónico"
                    value={this.state.email}
                    onChange={this.onChange}
                    fullWidth
                  />
                  {errors.email && <span className="help-block text-danger">{errors.email}</span>}
                </div>


                <div className="form-group">
                  <TextField
                    name="password"
                    floatingLabelText="Contraseña"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    fullWidth
                    />
                  {errors.password && <span className="help-block text-danger">{errors.password}</span>}
                </div>
              </fieldset>
              <div className="card-action no-border text-right">
                <button disabled={this.state.isLoading} type="submit" className="btn btn-primary">Inicio de sesión</button>
              </div>
            </form>
          </div>
        </div>

        <div className="additional-info">
          <a href="#/forgot-password">Ha olvidado su contraseña?</a>
        </div>

      </div>
    );
  }
}

class Page extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {userSignUpRequest} = this.props;
    return(
      <div className="page-login">
      <div className="main-body">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <Login userSignUpRequest={userSignUpRequest} />
          </div>
        </QueueAnim>
      </div>
    </div>
    );
  }
}


//To get the routers
Login.contextTypes = {
  router: PropTypes.object.isRequired
}

Login.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  //pass the providers
  return {

  }
}

module.exports = connect(
  mapStateToProps, { userSignUpRequest }
  )(Page);
