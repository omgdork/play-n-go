import { GameTag } from './game-tag.model';
import { GameRegulator } from './game-regulator.model';

export class Game {
  // instantiate a new Game object to access the public methods.
  // from: http://stackoverflow.com/a/36182096/769326
  constructor(public id: number,
              public name: string,
              public description: string,
              public gid: string,
              public type: string,
              public previewImg: string,
              public releaseDate: Date,
              public summary: string,
              public backdrop: string,
              public rtp: number,
              public youtubeId: string,
              public enabled: boolean,
              public gameTags: GameTag[],
              public gameRegulators: GameRegulator[]) {}

  public gameTagsToString = (): string => {
    const tags: string[] = this.gameTags.map((tag) => {
      return tag.displayName;
    });

    return tags.toString();
  }

  public gameRegulatorsToString = (): string => {
    const regulators: string[] = this.gameRegulators.map((regulator) => {
      return regulator.regulator;
    });

    return regulators.toString();
  }
}
