import { ReadStatus } from './ReadStatus';

export interface Book {
  id: string;
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
