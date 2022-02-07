import { metadata as metadataDark } from "./utils/metadata_dark";
import { metadata as metadataLight } from "./utils/metadata_light";

export const EDITIONS = {
  dark: metadataDark,
  light: metadataLight,
};

export enum EditionNames {
  Dark = "dark",
  Light = "light",
}

export const ITEMS_PER_PAGE = 30;

export const API_URL = "/api/nfts";
