import { useEffect, useState } from "react";

export function useFetch(url) {
  const [response, setResponse] = useState({});
  const [loading, setloading] = useState(true);

  async function getresponse() {
    setloading(true);
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    setResponse(json);
    setloading(false);
  }

  useEffect(() => {
    getresponse();
  }, [url]);

  return { response, loading };
}
