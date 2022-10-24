import React from 'react';

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateEmbedCode() {
    var e = document.getElementById("embed-builder"),
    embed = ["{embed}"],

    content = e.elements.content.value;
    content && embed.push("{content: ".concat(content, "}"));

    var title = e.elements.title.value;
    title && embed.push("{title: ".concat(title, "}"));

    var description = e.elements.description.value;
    description && embed.push("{description: ".concat(description, "}"));

    var url = e.elements.url.value;
    url && embed.push("{url: ".concat(url, "}"));

    var authorUrl = e.elements["author:url"].value,
      authorIconUrl = e.elements["author:icon_url"].value,
      authorName = e.elements["author:name"].value;
    if (authorName) {
      var author = "author: ".concat(authorName);
      authorIconUrl && (author += " && ".concat(authorIconUrl));
      if (authorIconUrl){
        authorUrl && (author += " && ".concat(authorUrl));
      }
      embed.push("{".concat(author, "}"));
    }

    var fieldsChildren = document.getElementById("fields").children;
    if (fieldsChildren.length)
      for (var i = 0; i < fieldsChildren.length; i++) {
        var fieldName = e.elements["field-".concat(i, ":name")].value,
          fieldValue = e.elements["field-".concat(i, ":value")].value,
          fieldInline = e.elements["field-".concat(i, ":inline")].checked;
        if (fieldName && fieldValue) {
          var field = "field: ".concat(fieldName, " && ").concat(fieldValue);
          fieldInline && (field += " && inline");
          embed.push("{".concat(field, "}"));
        }
      }

    var color = e.elements.color.value;
    color &&
      "#000000" !==
        (color = "".concat(
          parseInt(color, 10).toString(16).padStart(6, "0")
        )) &&
      embed.push("{color: #".concat(color, "}"));

    var thumbnail = e.elements["thumbnail:url"].value;
    thumbnail && embed.push("{thumbnail: ".concat(thumbnail, "}"));

    var image = e.elements["image:url"].value;
    image && embed.push("{image: ".concat(image, "}"));
    
    var timestampChecked = e.elements.timestamp.checked

    var footerText = e.elements["footer:text"].value,
    footerIconUrl = e.elements["footer:icon_url"].value;
    if (footerText || footerIconUrl) {
      var footer = "footer: ".concat(footerText)
      footerIconUrl && (footer += " && ".concat(footerIconUrl));
      embed.push("{".concat(footer, "}"));
    }
    
    timestampChecked && embed.push("{timestamp}");
    embed = embed.join("$v");
    document.getElementById("embed-output").innerHTML = embed;

    let embedOutput = document.getElementById('embed-output').innerHTML;
    embedOutput = embedOutput.replace(/"([\w]*)":/g, '<span class="highlight key">"$1"</span>:');
    embedOutput = embedOutput.replace(/(\d*),/g, '<span class="highlight number">$1</span>,');
    embedOutput = embedOutput.replace(/: (true|false)/g, ': <span class="highlight boolean">$1</span>');
    embedOutput = embedOutput.replace(/: "(.*?)"/g, ': <span class="highlight string">"$1"</span>');
    document.getElementById('embed-output').innerHTML = embedOutput;
  }

  copyData() {
    let element = document.getElementById('embed-output');
    if (document.selections) {
      let range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select().createTextRange();
      document.execCommand('Copy');
    }
    else if (window.getSelection) {
      let range = document.createRange();
      range.selectNode(element);
      window.getSelection().addRange(range);
      document.execCommand('Copy');
    }
    else {
      console.error('Unable to automatically copy the output, please copy it manually');
    }
  }

  render() {
    return(
      <div className = "cell">
        <div id = "output-container">
          <div className = "controller">
            <button onClick = {() => this.generateEmbedCode()}>
              <span role="img" aria-label="Gear Emoji">⚙</span>&ensp;Generate Embed Code
            </button>
            <button onClick = {() => this.copyData()}>
              <span role="img" aria-label="Copy Emoji">🔗</span>&ensp;Copy Embed Code
            </button>
          </div>
          <div className="output">
            <pre><div id="embed-output" readOnly>{JSON.stringify(this.state.embedObject, null, 2)}</div></pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Output;
