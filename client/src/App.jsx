import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [touristData, setTouristData] = useState([]);
  const getTouristData = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${searchText}`
    );
    console.log(result.data.data);
    setTouristData(result.data.data);
  };
  useEffect(() => {
    getTouristData();
  }, [searchText]);
  return (
    <div className="App">
      {/* Start coding here */}
      <h1>เที่ยวไหนดี</h1>
      <div>
        <h2>ค้นหาที่เที่ยว</h2>
        <input
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      {/* description eid photos tags title url */}
      {touristData.map((item) => (
        <div key={item.eid}>
          <img src={item.photos[0]} />
          <article>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>
              <span>หมวด</span>
              {item.tags.map((tag, tagIndex) =>
                tagIndex === tag.length - 1 ? (
                  <span key={tagIndex}>
                    และ <span>{tag}</span>
                  </span>
                ) : (
                  <span key={tagIndex}>{tag}</span>
                )
              )}
            </div>
            <div>
              {item.photos.slice(1).map((photo, photoIndex) => (
                <img key={photoIndex} src={photo} />
              ))}
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

export default App;
