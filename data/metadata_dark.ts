import { MetaDataCleaner } from "../lib/metadata_cleaner";
import metadataJSON from "../data/json/dark/_metadata.json";

export const metadata = MetaDataCleaner(metadataJSON);
