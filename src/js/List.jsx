import React, {Component} from 'react';
import TabList from './TabList';

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="columns">
          <div className="column is-4">
            <button className="button" onClick={this.props.removeDup}>Remove Duplicated URL</button>
          </div>
          <div className="column is-4">
            <button className="button" onClick={this.props.sweep}>Sweep these tabs from browser</button>
          </div>
        </div>

        <TabList com={this.props.com} rem={this.props.rem} tabs={this.props.tabs} />
      </div>
    );
  }
}

export default List;
