import React, {Component} from 'react';

import _ from 'underscore';

class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
      converter: 'markdown',
      output: '',
      opacity: 0
    }
  }
  render() {
    return (<div>
      <div className="columns">
        <div className="column is-5">
          <span className="select">
            <select value={this.state.converter} onChange={this.onConverterChanged.bind(this)}>
              <option value="markdown">Markdown</option>
              <option value="html">HTML</option>
            </select>
          </span>
        </div>
        <div className="column is-2">
          <button className="button" onClick={this.toOutput.bind(this)}><i className="fa fa-code"></i></button>
        </div>
        <div className="column is-5">
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
              height: this.state.output.split('\n').length*100+'px',
              width: '100%',
              overflowX: 'hidden', overflowY: 'scroll'
            }}></textarea>
          </p>
        </div>
      </div>
    </div>);
  }
  onConverterChanged(ev) {
    this.setState({converter: ev.target.value});
  }
  toOutput() {
    switch (this.state.converter) {
      case 'html': this.toHTML(); break;
      case 'markdown':
      default: this.toMarkdown(); break;
    }
  }
  toMarkdown() {
    let rows = [];
    _.map(this.props.tabs, (tab) => {
      let row = '- <img src="'+tab.favIconUrl+'" width="16px" height="16px"> ['+tab.title+']('+tab.url+')';
      rows.push(row);
      if (tab.comment) rows.push('    - ' + tab.comment);
    });
    this.setState({output: rows.join("\n")});
  }
  toHTML() {
    let rows = ['<ul>'];
    _.map(this.props.tabs, (tab) => {
      let row = '<li><img src="'+tab.favIconUrl+'" width="16px" height="16px"><a target="_blank" href="'+tab.url+'">'+tab.title+'</a></li>';
      rows.push(row);
    });
    rows.push('</ul>');
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
}
export default Output;
