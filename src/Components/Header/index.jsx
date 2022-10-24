import React from "react";

export default class Header extends React.PureComponent {
  render = () => (
    <header>
      <div id="back-to-home">
        <a href="https://jxzper.github.io">&larr;</a>
      </div>
      <div title="Create embeds for discord bot">jxzper.github.io</div>
    </header>
  );
}
