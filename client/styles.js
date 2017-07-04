const css = require('sheetify');

module.exports = css`
    html, body {
      margin:0;
      padding:0;
      font-family: sans-serif;
      background-color: palegreen;
      font-family: sans-serif;
    }
    body {
      margin: 2em;
    }
    a {
      text-decoration: none;
      font-weight: bold;
      color: deeppink;
    }
    button {
      background: none;
      font-size: 1.5em;
      margin: 0.2em;
      padding: 0.3em;
      border: 0.15em solid deeppink;
      color: deeppink;
      font-weight: bold;
      font-family: sans-serif;
      line-height: 1em;
      vertical-align: text-bottom;
    }
    button:hover {
      text-shadow: 0.1em 0.1em 0px hotpink;
      box-shadow: 0.1em 0.1em 0px hotpink;
      cursor: pointer;
    }
`;