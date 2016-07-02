var MessageBox = React.createClass({
  render : function() {
    return (
      <div className="messageBox">
        <h1>Message</h1>
        <MessageList />
        <MessageForm />
      </div>
    );
  }
});

var MessageList = React.createClass({
  render : function() {
    return (
      <div className="messageList">
        Hello, world! I am a messageList.
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

ReactDOM.render(
  <MessageBox />,
  document.getElementById("content")
);
