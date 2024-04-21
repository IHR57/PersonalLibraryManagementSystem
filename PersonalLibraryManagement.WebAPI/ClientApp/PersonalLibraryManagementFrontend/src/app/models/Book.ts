import { ReadStatus } from './ReadStatus';

export interface Book {
  name: string;
  category: string;
  writer: string;
  thumbnail: string;
  userId: string;
  boughtDate: string;
  buyingPrice: number;
  isFavourite: boolean;
  personalRating: number;
  finishedDate: string;
  personalNotes: string;
  status: ReadStatus;
}
