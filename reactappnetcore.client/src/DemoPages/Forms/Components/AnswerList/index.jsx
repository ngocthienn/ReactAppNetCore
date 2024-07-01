import React, { Fragment, Component, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
  Col,
  Row,
  Card,
  CardBody,
  Button,
  NavLink,
} from "reactstrap";

// import templateStore from '../../../../FormBuilderComponent/stores/templateStore';
import DataTable from 'react-data-table-component';
import PageTitle from "./PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getAnswerListWithUsername, searchAnswerWithKeyword } from '../../../../reducers/AnswerList'

const AnswerList = () => {
  const answer = useSelector(state => state.AnswerList.data);
  const userLogin = useSelector(state => state.UserCurrent.userLogin);
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(userLogin && userLogin.username !== '') {
      dispatch(getAnswerListWithUsername(userLogin.username));
    }
  }, [dispatch, userLogin]);

  const debounceSearch = (value) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setDebounceTimeout(setTimeout(() => {
      console.log(value);
      dispatch(searchAnswerWithKeyword(value));
    }, 500));
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debounceSearch(value);
  };

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
      maxWidth: '100px',
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
    {
      name : "Action",
      cell:(row) => (<div>
                        <Button color="primary" className="btn-pill btn-shadow">
                          <NavLink href={`#/forms/answer-item-view/${row.id}`}>View Answer</NavLink>
                        </Button> <br/>
                        <Button color="primary" className="btn-pill btn-shadow">
                          <NavLink href={`#/forms/answer-item-edit/${row.id}`}>Edit Answer</NavLink>
                        </Button>
                    </div>),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: '130px',
    }
  ];
  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>
            <PageTitle
              onChangeSearch={handleChange}
              valueSearch={searchTerm}
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