import metadataJSON from "../data/json/light/_metadata.json";
import { MetaDataCleaner } from "./metadata_cleaner";

export const metadata = MetaDataCleaner(metadataJSON);
