import { IsBoolean, IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  url: string;

  @IsBoolean()
  isThumbnail: boolean;
}
