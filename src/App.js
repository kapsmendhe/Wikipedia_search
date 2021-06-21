import React, { useState } from "react";
import './App.css';

function App() {
  const [wikilinks, setWikilinks] = useState([]);
  const [wikilinksText, setWikilinksText] = useState([]);
  function makeApiCall(event) {
    let str = event.target.value;
    if (str) {
      let url = `https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=` + str;
      fetch(url).then(data => {
        return data.json();
      }).then(res => {
        setWikilinks(res[3]);
        setWikilinksText(res[1])
      })
    }
  }

  var timer;

  const searchHandler = (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      makeApiCall(event);
    }, 400)

  }

  return (
    <div className="container">
      <h1>Wikipedia Search Engine</h1>
      <div className="wikiinput">
        <input type="text" placeholder="Search" onChange={searchHandler} />
      </div>
      <div className="wikibox">
        {wikilinksText && wikilinksText.map((ele, index) =>
          <>
            <a href={wikilinks[index]}>{ele}</a>
            <br />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
