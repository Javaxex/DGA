
export interface Movie {
  id: string;
  image: MovieImage
  title: string;
  titleType: TitleType;
  year: number;
  season?: number;
  episode?: number;
}

interface MovieImage {
  id: number;
  height: number
  width: number;
  url?: string;
}

type TitleType = 'tvMiniSeries' | 'movie' | 'video' | 'tvMovie' | 'podcastEpisode' | 'tvEpisode';
