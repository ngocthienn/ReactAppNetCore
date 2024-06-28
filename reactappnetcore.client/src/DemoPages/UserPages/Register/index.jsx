import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg3 from "../../../assets/utils/images/originals/citynights.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { connect } from "react-redux";

import { registerApp, RegisterStatus, changeRegistrationStatus } from "../../../reducers/UserCurrent";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        name: '',
        password: '',
        passwordrep: '',
      },
      errors: {
        username: '',
        name: '',
        password: '',
        passwordrep: '',
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
      const { passwordrep, ...data } = this.state.formData;
      let { registerApp } = this.props;
      registerApp(data);
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

    if (formData.name === '') {
      errors.name = 'Name is required';
    }

    if (formData.password === '') {
      errors.password = 'Password is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
      errors.password = 'Password can only contain letters and numbers';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (formData.passwordrep === '') {
      errors.passwordrep = 'Repeat Password is required';
    } else if (formData.password !== formData.passwordrep) {
      errors.passwordrep = 'Passwords must match';
    }
    
    return errors;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.registerStatus !== prevProps.registerStatus) {
      let { changeRegistrationStatus } = this.props;
      switch (this.props.registerStatus) {
        case RegisterStatus.REGISTRATION_SUCCESSFUL: {
          alert("Save success");
          changeRegistrationStatus(RegisterStatus.NOT_REGISTERED);
          this.props.history.push('/pages/login');
          break;
        }

        case RegisterStatus.REGISTRATION_FAILED: {
          alert("Save fail");
          changeRegistrationStatus(RegisterStatus.NOT_REGISTERED);
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
            <Col lg="7" md="12" className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4>
                  <div>Welcome,</div>
                  <span>
                    It only takes a{" "}
                    <span className="text-success">few seconds</span> to create
                    your account
                  </span>
                </h4>
                <div>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md={6}>
                        {/* <FormGroup>
                          <Label for="exampleEmail">
                            <span className="text-danger">*</span> Email
                          </Label>
                          <Input type="email" name="email" id="exampleEmail" placeholder="Email here..."/>
                        </FormGroup> */}
                        <FormGroup>
                          <Label for="exampleUsername">
                            <span className="text-danger">*</span> Username
                          </Label>
                          <Input onChange={this.handleChange} value={formData.username} invalid={errors.username !== ''} type="text" name="username" id="exampleUsername" placeholder="Username here..."/>
                          <FormFeedback>{errors.username}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleName">Name</Label>
                          <Input onChange={this.handleChange} value={formData.name} invalid={errors.name !== ''} type="text" name="name" id="exampleName" placeholder="Name here..."/>
                          <FormFeedback>{errors.name}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">
                            <span className="text-danger">*</span> Password
                          </Label>
                          <Input onChange={this.handleChange} value={formData.password} invalid={errors.password !== ''} type="password" name="password" id="examplePassword" placeholder="Password here..."/>
                          <FormFeedback>{errors.password}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePasswordRep">
                            <span className="text-danger">*</span> Repeat
                            Password
                          </Label>
                          <Input onChange={this.handleChange} value={formData.passwordrep} invalid={errors.passwordrep !== ''} type="password" name="passwordrep" id="examplePasswordRep" placeholder="Repeat Password here..."/>
                          <FormFeedback>{errors.passwordrep}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup className="mt-3" check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Accept our{" "}
                        <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()}>
                          Terms and Conditions
                        </a>
                        .
                      </Label>
                    </FormGroup>
                    <div className="mt-4 d-flex align-items-center">
                      <h5 className="mb-0">
                        Already have an account?{" "}
                        <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()} className="text-primary">
                          Sign in
                        </a>
                      </h5>
                      <div className="ms-auto">
                        <Button type="submit" color="primary" className="btn-wide btn-pill btn-shadow btn-hover-shine" size="lg">
                          Create Account
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
            <Col lg="5" className="d-lg-flex d-xs-none">
              <div className="slider-light">
                <Slider {...settings}>
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
                </Slider>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  registerStatus : state.UserCurrent.registerStatus,
});

const mapDispatchToProps = (dispatch) => ({
  registerApp : (registerData) => dispatch(registerApp(registerData)),
  changeRegistrationStatus : (registerStatus) => dispatch(changeRegistrationStatus(registerStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);