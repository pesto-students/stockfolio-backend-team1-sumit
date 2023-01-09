import React, { useEffect, useState } from "react";
import "./index.css";

const NewsDisplay = () => {
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((res) => {
        setNews(res[0].data);
      })
      .catch((err) => console.error(err));
  });

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 5px",
            margin: " 15px ",
          }}
        >
          <h2>Stockfolio News</h2>
          <input
            className="search_box"
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <br />
        </div>

        <div className="all__news">
          {news
            .filter((news) =>
              news.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((news) => {
              return (
                <div className="news">
                  <h5 className="news__title">{news.title}</h5>
                  <br />
                  <h6 className="news__author">
                    <b></b>
                    {news.author}
                  </h6>
                  <br />
                  <p className="news__desc">
                    <b>{news.description}</b>
                  </p>
                  <br />
                  <span className="news__source">
                    <b style={{ color: "blue" }}>Source:- </b>
                    {news.source}
                  </span>
                  <br />
                  <p className="news__published">
                    <b style={{ color: "blue" }}>Published On:- </b>
                    <br />
                    {news.published_at}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NewsDisplay;
