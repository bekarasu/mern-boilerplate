export interface IRequestQueryParams {
  limit?: string;
  start?: string;
  status?: string;
  slug?: string;
  resolation?: string;
  imageID?: string;
  refSlug?: string;
}

export interface IPreparedQueryParams {
  limit?: number;
  start?: number;
  status?: boolean;
  slug?: string;
  resolation?: string;
}
