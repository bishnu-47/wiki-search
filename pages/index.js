import { useRef, useState } from "react";
import Head from "next/head";

import SearchResultList from "../components/SearchResultList";

export default function Home() {
  const wikiSearchRef = useRef();
  const [resultsArr, setResultsArr] = useState([]);

  function formSubmitHandler(e) {
    e.preventDefault();
    const searchReq = wikiSearchRef.current.value.trim();
    if (searchReq === "") return;

    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchReq}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.query.search);
        setResultsArr(data.query.search);
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
          className="bg-cullen p-2 font-bold text-aro"
          placeholder="Search Something..."
        />
        <button
          type="submit"
          className="text-cullen font-bold bg-dracula-purple px-4 py-2"
        >
          Search
        </button>
      </form>
      <div>
        <SearchResultList resultsArr={resultsArr} />
      </div>
    </div>
  );
}
