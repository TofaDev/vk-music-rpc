import { MusicSource } from "../enum/MusicSource";

export interface ISong {
  artist: string;
  songName: string;
  source: MusicSource;
}
