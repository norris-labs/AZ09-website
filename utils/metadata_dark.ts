import metadataJSON from "../data/json/dark/_metadata.json";
import { MetaDataCleaner } from "./metadata_cleaner";

export const metadata = MetaDataCleaner(metadataJSON);
