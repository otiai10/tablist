import React, {Component} from 'react';
import TabList from './TabList';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {tabs: []}
    chrome.tabs.query({}, (tabs) => {
      this.setState({tabs: tabs});
    });
  }
  render() {
    return <TabList tabs={this.state.tabs} />;
  }
}
export default Root;
