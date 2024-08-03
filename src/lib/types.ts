export type Concept = {
  id: string;
  user_id: string;
  name: string;
  usage: string;
  date_created: Date;
  last_seen?: Date;
  progress: number;
  normalized_embedding: number[];
};
