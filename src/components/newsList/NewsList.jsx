import React from "react";
import NewsItem from "../newsItem/NewsItem";

const NewsList = ({ newslist }) => {
  if (!newslist.length) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Новости не найдены
      </h1>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        СПИСОК НОВОСТЕЙ
      </h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {newslist.map(news => 
          <NewsItem news={news} key={news.id} />
        )}
      </div>
    </div>
  );
};

export default NewsList;
