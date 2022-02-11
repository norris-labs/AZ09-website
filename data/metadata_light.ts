import { MetaDataCleaner } from '../utils/metadata_cleaner';
import metadataJSON from '../data/json/light/_metadata.json';

export const metadata = MetaDataCleaner(metadataJSON);
