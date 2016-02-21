import React, {Component} from 'react';
import TabList from './TabList';

import _ from 'underscore';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {tabs: [], output: '', opacity: 0}
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
            <div className="columns">
              <div className="column is-12">
                <button className="button" onClick={this.removeDup.bind(this)}>Remove Duplicated URL</button>
              </div>
            </div>
            <TabList com={this.comment.bind(this)} rem={this.remove.bind(this)} tabs={this.state.tabs} />
          </div>
          <div className="column is-4">
            <div className="columns">
              <div className="column is-12">
                <button className="button" onClick={this.toMarkdown.bind(this)}>Get Markdown</button>
                { (this.state.output == '') ? null : <button className="button" onClick={this.clipcopy.bind(this)}>
                    <i className="fa fa-paperclip"></i>
                  </button> }
              </div>
            </div>
            <div
              ref="note"
              className="notification is-primary"
              style={{
                opacity: this.state.opacity,
                display: (this.state.copied) ? 'inherit' : 'none'
              }}>
              <button className="delete"></button>
              Copied on clipboard!
            </div>
            <div className="columns">
              <div className="column is-12">
                <p className="control">
                  <textarea
                    readOnly
                    ref="output"
                    onFocus={this.selectOutput.bind(this)}
                    className="textarea"
                    rows={this.state.output.split('\n').length}
                    value={this.state.output}
                    style={{
                      height: this.state.output.split('\n').length*50+'px',
                      width: '100%', overflow: 'hidden'
                    }}></textarea>
                </p>
              </div>
            </div>
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
  toMarkdown() {
    let rows = [];
    _.map(this.state.tabs, (tab) => {
      let row = '- <img src="'+tab.favIconUrl+'" width="16px" height="16px"> ['+tab.title+']('+tab.url+')';
      rows.push(row);
      if (tab.comment) rows.push('    - ' + tab.comment);
    });
    this.setState({output: rows.join("\n")});
  }
  clipcopy() {
    this.selectOutput();
    document.execCommand('copy');
    this.setState({copied: true});
    let i = 0;
    let id = setInterval(() => {
      this.setState({opacity: i});
      i += 0.01;
      if (i > 1) clearInterval(id);
    }, 8);
    setTimeout(() => {
      let idout = setInterval(() => {
        this.setState({opacity: i});
        i -= 0.01;
        if (i < 0) {
          clearInterval(idout);
          this.setState({copied: false});
        }
      });
    }, 2000);
  }
  selectOutput() {
    this.refs.output.select();
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
