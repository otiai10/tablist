import React, {Component} from 'react';

class TabList extends Component {
  render() {
    let list = [];
    for (let i in this.props.tabs) {
      console.log(this.props.tabs[i]);
      list.push(<li key={i}>{this.props.tabs[i].url}</li>);
    }
    return <ul>{list}</ul>;
  }
}
export default TabList;
