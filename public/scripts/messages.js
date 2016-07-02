var MessageBox = React.createClass({
  render : function() {
    return (
      <div className="messageBox">
        Hello, world! I am a MessageBox.
      </div>
    );
  }
});

ReactDOM.render(
  <MessageBox />,
  document.getElementById("content")
);
