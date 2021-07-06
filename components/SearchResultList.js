export default function SearchResultList(props) {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <ul className="bg-nosferatu">
      {props.resultsArr.map((result) => (
        <li key={result.pageid} className="text-cullen px-4 py-2">
          <h3
            onClick={() =>
              openInNewTab(`https://en.wikipedia.org/?curid=${result.pageid})`)
            }
            target="_blank"
            className="text-2xl text-vanHelsing font-bold underline cursor-pointer inline"
          >
            {result.title}
          </h3>
          <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
        </li>
      ))}
    </ul>
  );
}
