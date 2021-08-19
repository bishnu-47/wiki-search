import { useRef, useState } from "react";
import Head from "next/head";

import SearchResultList from "../components/SearchResultList";
import LoadingIcon from "../components/loading-icon.js";

export default function Home() {
  const wikiSearchRef = useRef();
  const [resultsArr, setResultsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function formSubmitHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    const searchReq = wikiSearchRef.current.value.trim();
    if (searchReq === "") return;

    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchReq}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.query.search);
        setResultsArr(data.query.search);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="w-4/6 my-0 mx-auto">
      <Head>
        <title>Wiki Search</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1 className="text-dracula-purple font-bold text-4xl my-2">
        Wiki Search
      </h1>
      <form className="my-4" onSubmit={formSubmitHandler}>
        <input
          type="text"
          ref={wikiSearchRef}
          className="bg-cullen w-full mb-2 md:w-min p-2 font-bold text-aro"
          placeholder="Search Something..."
        />
        <button
          type="submit"
          className="text-cullen w-full md:w-min font-bold bg-dracula-purple px-4 py-2"
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <SearchResultList resultsArr={resultsArr} />
      )}
    </div>
  );
}
