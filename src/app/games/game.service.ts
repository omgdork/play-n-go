import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Game } from './game.model';
import { GameTag } from './game-tag.model';
import { GameRegulator } from './game-regulator.model';

@Injectable()
export class GameService {
  private rootUrl: string = 'http://playngo.com';
  private imageExtensions: string[] = ['.png', '.jpg', '.gif'];

  constructor(private http: Http) {}

  public getGames(): Observable<Game[]> {
    return this
      .http
      .get(`${this.rootUrl}/api/Games`, { headers: this.getHeaders() })
      .map(this.mapGames)
      .catch(this.handleError);
  }

  private getHeaders(): Headers {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  // arrow function to not lose context of 'this'
  // from: https://basarat.gitbooks.io/typescript/content/docs/tips/bind.html
  private mapGames = (response: Response): Game[] => {
    return response.json().map((game) => {
      const gameTags: GameTag[] = game.GameTags.map((gameTag) => {
        return new GameTag(gameTag.Tag, gameTag.DisplayName);
      });

      const gameRegulators: GameRegulator[] = game.GameRegulators.map((gameRegulator) => {
        return new GameRegulator(gameRegulator.Regulator);
      });

      const mappedGame: Game = new Game(
        game.Id,
        game.Name,
        game.Description,
        game.Gid,
        game.Type,
        this.formatImageUrl(game.PreviewImg, this.imageExtensions, 'http://placehold.it/150x150'),
        game.ReleaseDate,
        game.Summary,
        this.formatImageUrl(game.BackDrop, this.imageExtensions, 'http://placehold.it/1920x1080'),
        game.RTP,
        game.YoutubeId,
        game.Enabled,
        gameTags,
        gameRegulators
      );

      return mappedGame;
    });
  }

  private formatImageUrl = (imageUrl: string,
                            extensions: string[],
                            placeholderUrl: string): string => {
    if (imageUrl === null) {
      return placeholderUrl;
    }

    const isCorrectExtension = extensions.some((extension) => {
      return imageUrl.indexOf(extension) >= 0;
    });

    if (!isCorrectExtension) {
      return placeholderUrl;
    }

    const newUrl: string = imageUrl.charAt(0) === '/' ? imageUrl : `/${imageUrl}`;

    return `${this.rootUrl}${imageUrl}`;
  }

  private handleError (error: any) {
    const errorMessage = error.message || 'Well, something went wrong.';
    return Observable.throw(errorMessage);
  }
}
