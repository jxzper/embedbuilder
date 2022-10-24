import React from 'react';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  updateContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    return(
      <div className = "embed-group embed-content">
        <textarea
          name = "content"
          placeholder = "Content"
          maxLength = "2000"
          rows = "5"
          value = {this.state.content}
          onChange = {event => this.updateContent(event)}
        >
        </textarea>
      </div>
    );
  }
}

export default Content;
