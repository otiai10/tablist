import React, {Component} from 'react';
import Tab from './Tab'

class TabList extends Component {
  render() {
    let list = [];
    for (let i in this.props.tabs) {
      list.push(<Tab key={i} tab={this.props.tabs[i]} />);
    }
    return <table><tbody>{list}</tbody></table>;
  }
}
export default TabList;
