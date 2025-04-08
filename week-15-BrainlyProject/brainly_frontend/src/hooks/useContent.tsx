import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.contents);
      });
  }

  useEffect(() => {
    refresh();
  }, []);

  return { contents, refresh };
}
