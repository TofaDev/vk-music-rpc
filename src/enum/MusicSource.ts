export enum MusicSource {
  YANDEX = "YANDEX",
  VK = "VK",
}

export const translateMusicSource = (source: MusicSource) => {
  switch (source) {
    case MusicSource.YANDEX:
      return "Yandex Music";
    case MusicSource.VK:
      return "VK Music";
    default:
      return "Unknown Music Source";
  }
};
