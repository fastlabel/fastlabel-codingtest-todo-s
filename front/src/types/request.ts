export type ItemCreateParams = {
  content: string;
  isDone: boolean;
};

export type ItemUpdateParams = {
  order?: number;
  content?: string;
  isDone?: boolean;
};
