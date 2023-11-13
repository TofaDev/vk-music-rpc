// ==UserScript==
// @name         Yandex Music RPC hook
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  This extension is a hook for the vk-discord-rpc project on github
// @author       TofaDev
// @updateURL    https://raw.githubusercontent.com/TofaDev/vk-music-rpc/main/yandex-extension.js
// @downloadURL  https://raw.githubusercontent.com/TofaDev/vk-music-rpc/main/yandex-extension.js
// @match        *://music.yandex.ru/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Yandex_Music_icon.svg/2048px-Yandex_Music_icon.svg.png
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @require      https://cdn.socket.io/4.0.0/socket.io.min.js
// ==/UserScript==

const getCurrentPlayingMusic = () => {
  const artistElements = document.querySelectorAll(
    ".track__artists .d-link.deco-link"
  );
  const artistNames = Array.from(artistElements).map((element) =>
    element.textContent.trim()
  );

  const song = {
    artist: artistNames.join(", "),
    songName: document.querySelector(".track__title").textContent.trim(),
  };
  return song;
};

const musicIsPlaying = () => {
  const playButton = document.querySelector(".player-controls__btn_play");
  return (
    playButton && playButton.classList.contains("player-controls__btn_pause")
  );
};

let serverUrl = GM_getValue("serverUrl", "ws://localhost:8112");

GM_registerMenuCommand("Установить адрес websocket сервера", () => {
  let url = prompt(
    "Введите адрес для вебсокет сервера в формате: ws://host:port",
    serverUrl
  );
  if (url) {
    serverUrl = url;
    GM_setValue("serverUrl", url);
  }
});

(function () {
  "use strict";
  const socket = io.connect(serverUrl);

  socket.on("connect", () => {
    console.log("connected to vk-discord-rpc server");

    let lastSong = null;
    let isSongPaused = false;

    setInterval(() => {
      if (!musicIsPlaying()) {
        if (!isSongPaused) {
          socket.emit("song_paused", "song is paused");
          isSongPaused = true;
        }
        lastSong = null;
        return;
      }

      isSongPaused = false;

      let currentSong = getCurrentPlayingMusic();

      if (
        lastSong &&
        lastSong.artist === currentSong.artist &&
        lastSong.songName === currentSong.songName
      )
        return;

      lastSong = currentSong;

      console.log(currentSong);

      socket.emit("song_changed", {
        artist: currentSong.artist,
        songName: currentSong.songName,
        source: "YANDEX",
      });
    }, 500);
  });
})();
