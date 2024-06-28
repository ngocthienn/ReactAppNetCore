import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { changeLoginStatus, loginApp, LoginStatus } from "../../../reducers/UserCurrent";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: '',
      },
      errors: {
        username: '',
        password: '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validate();
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      let { loginApp } = this.props;
      loginApp(this.state.formData);
    }
  };

  validate = () => {
    const { formData } = this.state;
    let errors = {};

    if (formData.username === '') {
      errors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters and numbers';
    }

    if (formData.password === '') {
      errors.password = 'Password is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
      errors.password = 'Password can only contain letters and numbers';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    return errors;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loginStatus !== prevProps.loginStatus) {
      let { changeLoginStatus } = this.props;
      switch (this.props.loginStatus) {
        case LoginStatus.LOGIN_SUCCESSFUL: {
          alert("Login success");
          changeLoginStatus(LoginStatus.NOT_LOGGED_IN);
          this.props.history.push('/dashboards/crm');
          break;
        }

        case LoginStatus.LOGIN_FAILED: {
          alert("Login fail");
          changeLoginStatus(LoginStatus.NOT_LOGGED_IN);
          break;
        }

        default:
          break;
      }
    }
  }

  render() {
    const { formData, errors } = this.state;

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 g-0">
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg1 + ")",
                      }}/>
                    <div className="slider-content">
                      <h3>Perfect Balance</h3>
                      <p>
                        ArchitectUI is like a dream. Some think it's too good to
                        be true! Extensive collection of unified React Boostrap
                        Components and Elements.
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }}/>
                    <div className="slider-content">
                      <h3>Scalable, Modular, Consistent</h3>
                      <p>
                        Easily exclude the components you don't require.
                        Lightweight, consistent Bootstrap based styles across
                        all elements and components
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: "url(" + bg2 + ")",
                      }}/>
                    <div className="slider-content">
                      <h3>Complex, but lightweight</h3>
                      <p>
                        We've included a lot of components that cover almost all
                        use cases for any type of application.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4 className="mb-0">
                  <div>Welcome back,</div>
                  <span>Please sign in to your account.</span>
                </h4>
                <h6 className="mt-3">
                  No account?{" "}
                  <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()} className="text-primary">
                    Sign up now
                  </a>
                </h6>
                <Row className="divider" />
                <div>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md={6}>
                        {/* <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input type="email" name="email" id="exampleEmail" placeholder="Email here..."/>
                        </FormGroup> */}
                        <FormGroup>
                          <Label for="exampleUsername">Username</Label>
                          <Input onChange={this.handleChange} value={formData.username} invalid={errors.username !== ''} type="text" name="username" id="exampleUsername" placeholder="Username here..."/>
                          <FormFeedback>{errors.username}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">Password</Label>
                          <Input onChange={this.handleChange} value={formData.password} invalid={errors.password !== ''} type="password" name="password" id="examplePassword" placeholder="Password here..."/>
                          <FormFeedback>{errors.password}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                    <Row className="divider" />
                    <div className="d-flex align-items-center">
                      <div className="ms-auto">
                        <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()} className="btn-lg btn btn-link" >
                          Recover Password
                        </a>{" "}
                        <Button type="submit" color="primary" size="lg">
                          Login to Dashboard
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  loginStatus : state.UserCurrent.loginStatus,
});

const mapDispatchToProps = (dispatch) => ({
  loginApp : (loginData) => dispatch(loginApp(loginData)),
  changeLoginStatus : (loginStatus) => dispatch(changeLoginStatus(loginStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);