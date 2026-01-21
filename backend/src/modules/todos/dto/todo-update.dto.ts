import { IsEnum, IsOptional, IsString } from 'class-validator';

export class TodoUpdateDto {
  @IsEnum(['created', 'completed', 'on_going', 'problem'])
  status: 'created' | 'completed' | 'on_going' | 'problem';

  @IsOptional()
  @IsString()
  problem_desc?: string;
}
