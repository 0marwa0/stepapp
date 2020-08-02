/** @format */

import React from "react";
export default class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTabIndex: props.children.length == 0 ? null : 0,
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(index) {
    this.setState({
      selectedTabIndex: index,
    });

    this.props.onTabChange(index);
  }

  _renderTabs() {
    let tabs = [];
    let src = ["productIcon1.png", "productIcon2.png"];

    for (let i = 0; i < this.props.children.length; i++) {
      tabs.push(
        <Tab
          key={`tab-${i}`}
          src={require(`../../shared/Icon/${src[i]}`)}
          label={this.props.children[i].props.title}
          index={i}
          isSelected={i === this.state.selectedTabIndex}
          onClick={this._handleClick}
        />
      );
    }

    return <div className='tab_icon'>{tabs}</div>;
  }

  _renderTabContent() {
    return this.props.children[this.state.selectedTabIndex].props.children;
  }

  render() {
    if (this.state.selectedTabIndex == null) {
      return "nope";
    }

    return (
      <div className='tab-panel'>
        <div className='tab-panel__header'>{this._renderTabs()}</div>
        <div className='tab-panel__content'>{this._renderTabContent()}</div>
      </div>
    );
  }
}

class Tab extends React.Component {
  _handleClick = () => {
    this.props.onClick(this.props.index);
  };

  render() {
    const tabClassName = this.props.isSelected ? "tab tab--selected" : "tab";

    return <img onClick={this._handleClick} src={this.props.src} />;
  }
}
