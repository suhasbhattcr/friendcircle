import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
.setTitle('Friends circle')
.setDescription('List of friends APIs')
.setVersion('1.0')
.addTag('friend')
.build();