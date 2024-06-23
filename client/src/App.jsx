import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [touristData, setTouristData] = useState([]);
  const [isContinueReading, setIsContinueReading] = useState([]);
  const getTouristData = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${searchText}`
    );
    setTouristData(result.data.data);
  };
  useEffect(() => {
    setIsContinueReading(touristData.map((item) => false));
  }, [touristData]);
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
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="text-center text-sm w-full border-b-2"
          />
        </div>
      </header>
      {/* description eid photos tags title url */}
      <main className="px-10 w-full">
        {touristData.map((item, index) => (
          <div key={item.eid} className="flex mt-10 gap-8 items-center">
            <img
              src={item.photos[0]}
              className="rounded-3xl object-cover"
              width={305}
              height={215}
            />
            <article className="text-gray-500 relative">
              <h3 className=" text-xl font-bold text-black">{item.title}</h3>
              <div className=" text-sm ">
                {item.description.length <= 100 ? (
                  <p>{item.description}</p>
                ) : isContinueReading[index] ? (
                  <p>
                    <span>{item.description} </span>
                    <button
                      onClick={() => {
                        setIsContinueReading(
                          isContinueReading.toSpliced(index, 1, false)
                        );
                        console.log(isContinueReading);
                      }}
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
                      onClick={() => {
                        setIsContinueReading(
                          isContinueReading.toSpliced(index, 1, true)
                        );
                        // open(item.url, "_blank");
                      }}
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
                        onClick={() => {
                          setSearchText(searchText + " " + tag);
                        }}
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
                        onClick={() => setSearchText(searchText + " " + tag)}
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
                className="absolute w-12 h-12 right-2 bottom-2 rounded-full bg-blue-500 text-white"
                onClick={() => navigator.clipboard.writeText(item.url)}
              >
                Link
              </button>
            </article>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
