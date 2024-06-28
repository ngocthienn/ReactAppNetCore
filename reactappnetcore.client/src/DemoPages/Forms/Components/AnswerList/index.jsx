import React, { Fragment, Component, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
  Col,
  Row,
  Button,
  Card,
  NavLink,
  CardBody,
} from "reactstrap";

// import templateStore from '../../../../FormBuilderComponent/stores/templateStore';
import DataTable from 'react-data-table-component';
import PageTitle from "./PageTitle";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAnswerListWithUsername } from '../../../../reducers/AnswerList'
import { nanoid } from 'nanoid'

const AnswerList = () => {
  const answer = useSelector(state => state.AnswerList.data);
  const userLogin = useSelector(state => state.UserCurrent.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if(userLogin && userLogin.username !== '') {
      dispatch(getAnswerListWithUsername(userLogin.username));
    }
  }, [dispatch, userLogin]);

  // debounceSearch = (value) => {
  //   if (this.debounceTimeout) {
  //     clearTimeout(this.debounceTimeout);
  //   }
  //   this.debounceTimeout = setTimeout(() => {
  //     console.log(value);
  //     // templateStore.dispatch('searchAllTemplate', value);
  //   }, 500);
  // };

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   this.setState({ searchTerm: value });
  //   this.debounceSearch(value);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.answer !== prevProps.answer) {
  //     this.setState({ answer: this.props.answer });
  //   }
  // }

 
  const columns = [
    // {
    //   name: "#",
    //   selector: (row, index) => index + 1,
    //   sortable: true,
    // },
    {
      name: "ID",
      id: "id",
      selector: row => row.id,
      sortable: true,
      maxWidth: '130px',
    },
    {
      name: "Template Id",
      selector: row => row.templateId,
      sortable: true,
      maxWidth: '130px',
    },
    {
      name: "Username",
      selector: row => row.username,
      sortable: true,
      maxWidth: '130px',
    },
    {
      name: "Data",
      selector: row => JSON.stringify(row.answerData),
      sortable: true,
    },
  ];
  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>
            <PageTitle
              // onChangeSearch={handleChange}
              // valueSearch={this.state.searchTerm}
              heading="Answer List"
            />
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <DataTable className="text-nowrap" data={answer || []}
                        columns={columns}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="550px"
                      />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
  
}

export default AnswerList;
// const mapStateToProps = (state) => ({
//   answer : state.AnswerList.data,
//   userLogin : state.UserCurrent.userLogin,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getAnswerListWithUsername : (username) => dispatch(getAnswerListWithUsername(username)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);