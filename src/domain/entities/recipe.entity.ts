import { v4 as uuidv4 } from 'uuid';

export class Recipe {
  constructor(
    public readonly id: string,
    public title: string,
    public summary: string,
    public ingredients: string[],
    public steps: string[],
    public chefId: string,
    public images: { url: string; isThumbnail: boolean }[] = [],
    public createdAt?: Date,
    public updatedAt?: Date,
    public labels?: string[],
  ) {}

  static create(data: {
    title: string;
    summary: string;
    ingredients: string[];
    steps: string[];
    chefId: string;
    images?: { url: string; isThumbnail: boolean }[];
    labels?: string[];
  }): Recipe {
    return new Recipe(
      uuidv4(),
      data.title,
      data.summary,
      data.ingredients,
      data.steps,
      data.chefId,
      data.images || [],
      new Date(),
      new Date(),
      data.labels || [],
    );
  }

  addLabel(label: string) {
    if (!this.labels.includes(label)) this.labels.push(label);
  }

  addImage(url: string, isThumbnail = false) {
    this.images.push({ url, isThumbnail });
  }
}
