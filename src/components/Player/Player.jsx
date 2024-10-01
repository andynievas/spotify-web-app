import musica from "./lose_control.mp3";
import { useEffect, useState } from "react";

const styles = {
  playerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  playerControls: {
    backgroundColor: "rgb(100,100,100)",
    border: "2px red solid",
    width: "60vw",
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    color: "white",
  },
  leftSection: {
    flex: 1,
    backgroundColor: "rgb(90,110,80)",
  },
  playerButtons: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "rgb(80,80,80)",
    width: "90px",
    height: "90px",
    margin: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgb(90,110,80)",
  },
};

const playText = "|> ||";
const prevText = "<<";
const nextText = ">>";

function LeftSection({ current_track }) {
  console.log("current_track");
  console.log(current_track);
  return (
    <div style={styles.leftSection}>
      <p>
        {current_track
          ? current_track.name
          : "Playing... Playing... Playing..."}
      </p>
      <p>
        {current_track
          ? current_track.artists.map(({ name }) => name).join(", ")
          : "Playing... Playing... Playing..."}
      </p>
    </div>
  );
}

function PlayButton({ play }) {
  return (
    <button
      id="play-pause-btn"
      style={styles.button}
      onClick={() => {
        play();
      }}
    >
      {playText}
    </button>
  );
}

function NextPrevButton({ isNext }) {
  return <div style={styles.button}>{isNext ? nextText : prevText}</div>;
}

function PlayerButtons({ play }) {
  return (
    <div style={styles.playerButtons}>
      <NextPrevButton />
      <PlayButton play={play} />
      <NextPrevButton isNext />
    </div>
  );
}

function RightSection() {
  return (
    <div style={styles.rightSection}>
      <span id="right-section">Cola</span>
      <span>Volumen</span>
    </div>
  );
}

function Player({ token }) {
  const [playerrr, setPlayer] = useState();

  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState();

  useEffect(() => {
    console.log("token");
    console.log(token);
    if (token) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("window.onSpotifyWebPlaybackSDKReady");
        const player = new window.Spotify.Player({
          name: "Musica en el nas",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });

        setPlayer(player);

        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", (state) => {
          if (!state) {
            return;
          }

          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then((state) => {
            !state ? setActive(false) : setActive(true);
          });
        });

        player.connect();
      };
    }
  }, []);

  const playPause = () => {
    const audioControl = document.getElementById("audio-control");
    console.log("audioControl.paused");
    console.log(audioControl.paused);
    if (audioControl.paused) {
      audioControl.play();
    } else {
      audioControl.pause();
    }
  };
  return (
    <div style={styles.playerContainer}>
      <audio src={musica} controls id="audio-control" />
      <div style={styles.playerControls}>
        <LeftSection current_track={current_track} />
        <PlayerButtons play={playPause} />
        <RightSection />
      </div>
    </div>
  );
}

export default Player;
