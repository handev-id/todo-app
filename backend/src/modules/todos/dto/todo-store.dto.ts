import { IsString } from 'class-validator';

export class TodoStoreDto {
  @IsString()
  title: string;
}
