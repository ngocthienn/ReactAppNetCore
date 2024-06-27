import React, { Fragment, Component } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
  Col,
  Row,
  Button,
  Card,
  NavLink,
  CardBody,
} from "reactstrap";

import templateStore from '../../../../FormBuilderComponent/stores/templateStore';
import DataTable from 'react-data-table-component';
import PageTitle from "./PageTitle";

export default class TemplateList extends Component {
  constructor() {
    super();
    this.state = {
      template: [],
      active: false,
      activeSearch: true,
      searchTerm : '',
    };
    this.debounceTimeout = null;
  }

  componentDidMount() {
    templateStore.dispatch('getAllTemplate');
    templateStore.subscribe(state => this.onUpdateByStore(state));
  }

  onUpdateByStore(state) {
    this.setState({
      template : state.data,
    });
  }

  debounceSearch = (value) => {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      console.log(value);
      templateStore.dispatch('searchAllTemplate', value);
    }, 500);
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchTerm: value });
    this.debounceSearch(value);
  }

  render() {
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
      },
    
      {
        name: "Name",
        selector: row => row.name,
        sortable: true,
      },
      {
        name : "Action",
        cell:(row) => (<div>
                          <Button color="primary" className="btn-pill btn-shadow">
                            <NavLink href={`#/forms/form-builder/${row.id}`}>Edit Template</NavLink>
                          </Button> <br/>
                          <Button color="primary" className="btn-pill btn-shadow">
                            <NavLink href={`#/forms/create-answer-form/${row.id}`}>Answer Template</NavLink>
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
                onChangeSearch={this.handleChange}
                valueSearch={this.state.searchTerm}
                heading="Template List"
              />
              <Row>
                <Col md="12">
                  <Card className="main-card mb-3">
                    <CardBody>
                      <DataTable className="text-nowrap" data={this.state.template}
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
}
