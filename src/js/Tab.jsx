import React, {Component} from 'react';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {showCommentInput: false};
  }
  render() {
    return (
      <tr className="columns">
        <td className="column is-1">
          <img className="image is-16x16" src={this.props.tab.favIconUrl} />
        </td>
        <td className="column is-9">
          <a href={this.props.tab.url} target="_blank">{this.props.tab.title}</a>
          { this.state.showCommentInput ? <p className="control">
            <input
              type="text"
              ref="commentInput"
              onBlur={this.commit.bind(this)}
              onKeyDown={this.forInput.bind(this)}
              defaultValue={this.props.tab.comment}
              className="input" style={{fontSize: '0.8em', width: '100%'}}/>
          </p> : null}
          { (this.props.tab.comment && !this.state.showCommentInput) ? <p>
              <span>{this.props.tab.comment}</span>
          </p> : null }
        </td>
        <td className="column is-2" >
          <div className="columns">
            <label className="column is-3" onClick={this.toggleCommentInput.bind(this)}><i className="fa fa-comment-o"></i></label>
            <label className="column is-3 is-offset-2" onClick={this.remove.bind(this)}><i className="fa fa-times"></i></label>
          </div>
        </td>
      </tr>
    );
  }
  remove() {
    this.props.rem(this.props.seq);
  }
  toggleCommentInput() {
    let show = !this.state.showCommentInput;
    this.setState({showCommentInput: show});
    if (show) setTimeout(() => {
      this.refs.commentInput.focus();
      this.refs.commentInput.selectionStart = this.refs.commentInput.selectionEnd = this.refs.commentInput.value.length;
    });
  }
  forInput(ev) {
    let ENTER = 13;
    if (ev.which == ENTER) {
      this.commit(ev);
    }
  }
  commit(ev, close = true) {
    let comment = ev.target.value;
    if (comment) this.props.com(this.props.seq, comment);
    this.toggleCommentInput();
  }
}
export default Tab;
