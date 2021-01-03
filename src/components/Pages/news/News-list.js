import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import { axios } from "../../Axios/Axios";

const NewsList = () => {
  const [news, setNews] = useState([]);

  const noNews = !news || (news && news.length === 0); //check if no news

  const getNews = async () => {
    //fetch news data
    const response = await axios
      .get("/news")
      .catch((err) => console.log("Error", err)); //handle errors
    if (response && response.data) {
      setNews(response.data); // set news data to state
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  let { url } = useRouteMatch();

  return (
    <div>
      {!noNews &&
        news.map((newsItem, idx) => {
          return (
            <Link
              to={{
                pathname: `${url}/${newsItem.id}`,
                state: {
                  newsItem,
                },
              }}
              key={idx}
            >
              <div>{newsItem.titleA}</div>
            </Link>
          );
        })}
      {noNews && <h2 className="text-center p-4"> لا توجد أخبار</h2>}
    </div>
  );
};

export default NewsList;
