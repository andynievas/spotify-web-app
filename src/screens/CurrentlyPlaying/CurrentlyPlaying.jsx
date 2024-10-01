import SearchInput from "../../components/Search/SearchInput";
import AppContent from "../../components/AppContent/AppContent";
import Content from "../../components/Content/Content";
import Player from "../../components/Player/Player";
import { useEffect, useState } from "react";
import { useSearchParams, useLoaderData } from "react-router-dom";

function CurrentlyPlaying() {
  const params = useLoaderData();
  console.log("CurrentlyPlaying, params");
  console.log(params);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Request token
    const requestToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/token");
        const parsedResponse = await response.json();
        const { access_token } = parsedResponse;
        if (access_token && access_token !== "") {
          setToken(access_token);
        }
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    };
    requestToken();
  }, []);

  return (
    <div>
      <AppContent>
        <SearchInput />
        <Content />
        {token ? <Player token={token} /> : <></>}
      </AppContent>
    </div>
  );
}

export default CurrentlyPlaying;
