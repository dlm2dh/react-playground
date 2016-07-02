var data = [
  { id : 1, author : "Doug Milvaney", text : "My first message" },
  { id : 2, author : "Jane Doe", text : "Here is another message"}
];

var MessageBox = React.createClass({
  render : function() {
    return (
      <div className="messageBox">
        <h1>Message</h1>
        <MessageList data={this.props.data} />
        <MessageForm />
      </div>
    );
  }
});

var MessageList = React.createClass({
  render : function() {
    var messageNodes = this.props.data.map(function(message) {
      return (
        <Message author={message.author} key={message.id}>
          {message.text}
        </Message>
      );
    });
    return (
      <div className="messageList">
        {messageNodes}
      </div>
    );
  }
});

var MessageForm = React.createClass({
  render : function() {
    return (
      <div className="messageForm">
        Hello, world! I am a MessageForm.
      </div>
    );
  }
});

var Message = React.createClass({
  render : function() {
    return (
      <div className="message">
        <h2 className="messageAuthor">
          { this.props.author }
        </h2>
        { this.props.author }
      </div>
    );
  }
});

ReactDOM.render(
  <MessageBox data={data} />,
  document.getElementById("content")
);
