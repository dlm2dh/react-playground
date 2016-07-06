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
  handleMessageSubmit : function(message) {
    var messages = this.state.data;
    message.id = Date.now();
    var newMessages = messages.concat([message]);
    this.setState({ data : newMessages });
    $.ajax({
      url : this.props.url,
      dataType : "json",
      type : "POST",
      data : message,
      success : function(data) {
        this.setState({ data : data });
      }.bind(this),
      error : function(xhr, status, err) {
        this.setState({ data : messages });
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
        <MessageList data={ this.state.data } />
        <MessageForm onMessageSubmit={ this.handleMessageSubmit } />
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
  getInitialState : function() {
    return { author : "", text : "" };
  },
  handleAuthorChange : function(e) {
    this.setState({ author : e.target.value });
  },
  handleTextChange : function(e) {
    this.setState({ text : e.target.value });
  },
  handleSubmit : function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onMessageSubmit({ author : author, text : text });
    this.setState({ author : "", text : "" });
  },
  render : function() {
    return (
      <form className="messageForm" onSubmit={ this.handleSubmit }>
        <input
          type="text"
          placeholder="Your name"
          onChange={ this.handleAuthorChange }
        />
        <input
          type="text"
          placeholder="Say something..."
          onChange={ this.handleTextChange }
        />
        <input type="submit" value="Post" />
      </form>
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
