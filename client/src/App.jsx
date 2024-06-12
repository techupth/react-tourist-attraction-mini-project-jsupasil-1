import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [touristData, setTouristData] = useState([]);
  const [isContinueReading, setIsContinueReading] = useState(false);
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
    <div className="App flex flex-col items-center">
      {/* Start coding here */}
      <header className="w-full flex flex-col items-center">
        <h1 className="text-5xl text-dodgerblue text-center font-black mt-14">
          เที่ยวไหนดี
        </h1>
        <div className=" w-[80%] mt-7">
          <h2 className=" text-sm">ค้นหาที่เที่ยว</h2>
          <input
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            onChange={(event) => setSearchText(event.target.value)}
            className="text-center text-sm w-full border-b-2"
          />
        </div>
      </header>
      {/* description eid photos tags title url */}
      <main className="px-10 w-full">
        {touristData.map((item) => (
          <div key={item.eid} className="flex mt-10 gap-8">
            <img
              src={item.photos[0]}
              className="w-[305px] h-[215px] rounded-3xl object-cover"
            />
            <article className="text-gray-500 relative">
              <h3 className=" text-xl font-bold text-black">{item.title}</h3>
              <div className=" text-sm ">
                {item.description.length <= 100 ? (
                  <p>{item.description}</p>
                ) : isContinueReading ? (
                  <p>
                    <span>{item.description} </span>
                    <button
                      onClick={() => setIsContinueReading(!isContinueReading)}
                      className=" text-blue-400"
                    >
                      {" "}
                      ยาวไปไม่อ่าน
                    </button>
                  </p>
                ) : (
                  <p>
                    <span>{item.description.slice(0, 100)}</span>
                    <button
                      onClick={() => setIsContinueReading(!isContinueReading)}
                      className=" text-blue-400"
                    >
                      ... อ่านต่อ
                    </button>
                  </p>
                )}
              </div>
              <div>
                <span>หมวด</span>
                {item.tags.map((tag, tagIndex) =>
                  tagIndex === item.tags.length - 1 ? (
                    <span key={tagIndex}>
                      {" "}
                      และ{" "}
                      <a
                        href={`https://www.google.com/search?q=${tag}`}
                        target="_blank"
                        className=" underline"
                      >
                        {tag}
                      </a>
                    </span>
                  ) : (
                    <span key={tagIndex}>
                      {" "}
                      <a
                        href={`https://www.google.com/search?q=${tag}`}
                        target="_blank"
                        className=" underline"
                      >
                        {tag}
                      </a>
                    </span>
                  )
                )}
              </div>
              <div className="flex gap-8 mt-3">
                {item.photos.slice(1).map((photo, photoIndex) => (
                  <img
                    key={photoIndex}
                    src={photo}
                    className="w-[100px] h-[100px] object-cover rounded-xl"
                  />
                ))}
              </div>
              <button
                className="absolute right-2 bottom-2 rounded-full"
                onClick={() => open(item.url, "_blank")}
              >
                Click Me
              </button>
            </article>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
