import axios from "axios";
import { useState, useEffect } from "react";

export function useFetchData() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_PORT}/users/login`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(data.user);
        setLoading(false);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        if (window.location.pathname !== "/auth") {
          window.location = "/auth";
          setLoading(false);
        }
      }
    } else {
      if (window.location.pathname !== "/auth") {
        window.location = "/auth";
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
}
