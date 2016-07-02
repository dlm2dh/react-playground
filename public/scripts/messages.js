var data = [
  { id : 1, author : "Doug Milvaney", text : "My first message" },
  { id : 2, author : "Jane Doe", text : "Here is another message"}
];

var MessageBox = React.createClass({
  loadMessagesFromServer : function() {
    $.ajax({
      url : this.props.url,
      dataType : "json",
      cache : false,
      success : function(data) {
        this.setState({ data : data });
      }.bind(this),
      error : function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState : function() {
    return { data : [] };
  },
  componentDidMount : function() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval);
  },
  render : function() {
    return (
      <div className="messageBox">
        <h1>Messages</h1>
        <MessageList data={this.state.data} />
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
  <MessageBox url="/api/messages" pollInterval={2000} />,
  document.getElementById("content")
);
