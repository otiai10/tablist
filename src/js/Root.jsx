import React, {Component} from 'react';
import List from './List';
import Output from './Output';

import _ from 'underscore';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {tabs: []}
    chrome.tabs.query({
      url: ['http://*/*', 'https://*/*']
    }, (tabs) => {
      this.setState({tabs: tabs});
    });
  }
  render() {
    return (
      <div className="content">
        <header style={{marginTop: '12px'}}>
          <h1 className="title">Tab Archive</h1>
        </header>
        <div className="columns">
          <div className="column is-8">
            <List tabs={this.state.tabs} com={this.comment.bind(this)} rem={this.remove.bind(this)} removeDup={this.removeDup.bind(this)} />
          </div>
          <div className="column is-4">
            <Output tabs={this.state.tabs} />
          </div>
        </div>
      </div>
    );
  }
  removeDup() {
    let dict = {};
    this.setState({tabs: _.filter(this.state.tabs, (tab) => {
      if (!!dict[tab.url]) return false;
      else dict[tab.url] = true; return true;
    })});
  }
  remove(i) {
    this.state.tabs.splice(i, 1);
    this.setState({tabs: this.state.tabs});
  }
  comment(i, comment) {
    this.state.tabs[i].comment = comment;
    this.setState({tabs: this.state.tabs});
  }
}
export default Root;
