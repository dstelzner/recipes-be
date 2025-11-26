export class Recipe {
  constructor(
    public readonly id: string,
    public title: string,
    public summary: string,
    public ingredients: string[],
    public steps: string[],
    public chefId: number,
    public createdAt: Date,
    public updatedAt: Date,
    public images: { url: string; isThumbnail: boolean }[] = [],
    public labels?: string[],
  ) {}

  addLabel(label: string) {
    if (!this.labels.includes(label)) this.labels.push(label);
  }

  addImage(url: string, isThumbnail = false) {
    this.images.push({ url, isThumbnail });
  }
}
