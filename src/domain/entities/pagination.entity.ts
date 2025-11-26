export class Pagination<T> {
  constructor(
    public data: T[],
    public total: number,
    public page: number,
    public limit: number,
    public pages: number,
  ) {}

  static create<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): Pagination<T> {
    const pages = Math.ceil(total / limit);
    return new Pagination(data, total, page, limit, pages);
  }
}
