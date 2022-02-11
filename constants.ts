import { metadata as metadataDark } from './data/metadata_dark';
import { metadata as metadataLight } from './data/metadata_light';

export const EDITIONS = {
  dark: metadataDark,
  light: metadataLight,
};

export enum EditionNames {
  Dark = 'dark',
  Light = 'light',
}

export const ITEMS_PER_PAGE = 30;

export const API_URL = '/api/nfts';

export const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };
