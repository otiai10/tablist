import React, {Component} from 'react';

class Tab extends Component {
  render() {
    return (
      <tr className="columns">
        <td className="column is-1">
          <img className="image is-24x24" src={this.props.tab.favIconUrl} />
        </td>
        <td className="column is-8">
          <a href={this.props.tab.url} target="_blank">{this.props.tab.title}</a>
        </td>
        <td className="column is-3">
          <i className="fa fa-times"></i>
        </td>
      </tr>
    );
  }
}
export default Tab;
