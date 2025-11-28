import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ImageDto {
  @ApiProperty({
    description: 'Image URL',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Indicates if the image is a thumbnail',
    example: false,
  })
  @IsBoolean()
  isThumbnail: boolean;
}
