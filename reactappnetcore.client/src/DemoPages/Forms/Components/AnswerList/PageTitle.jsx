import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";

class PageTitle extends Component {
  constructor(props) {
    super(props);
  }

  randomize(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
  }

  render() {
    let {
      heading,
    } = this.props;

    return (
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div>
              {heading}
            </div>
          </div>
          <div className="page-title-actions">
            {/* Search */}
            <div className={cx("search-wrapper", {
                  active: true,
                })}>
              <div className="input-holder">
                <input type="text" className="search-input" placeholder="Type ID or Template Id to search" value={this.props.valueSearch} onChange={this.props.onChangeSearch} />
                <button 
                  className="search-icon">
                  <span/>
                </button>
              </div>
            </div>
          </div>
          {/* <div className="page-title-actions">{this.randomize(arr)}</div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
  enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
