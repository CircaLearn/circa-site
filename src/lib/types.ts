export type RowData = {
  id: string;
  user_id: string;
  name: string;
  usage: string;
  dateAdded: string;
};

export type FetchConceptsResponse = {
  data: RowData[] | null;
  receivedTime: string | null;
};
