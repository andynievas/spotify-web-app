import SearchInput from "../../components/Search/SearchInput";
import AppContent from "../../components/AppContent/AppContent";
import Content from "../../components/Content/Content";
import Player from "../../components/Player/Player";
import { useEffect, useState } from "react";
import { useSearchParams, useLoaderData } from "react-router-dom";

function MusicController() {
  const params = useLoaderData();
  console.log("MusicController, params");
  console.log(params);
  // const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <AppContent>
        <SearchInput />
        <Content />
        <Player />
      </AppContent>
    </div>
  );
}

export default MusicController;
