type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

type NFTMetaData = {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: number;
  date: number;
  variation: string;
  attributes: Attribute[];
  compiler: string;
  attrString: string;
};

type Attribute = {
  trait_type: string;
  value: string;
};
