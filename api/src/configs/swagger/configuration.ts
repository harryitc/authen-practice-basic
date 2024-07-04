import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (path: string, app: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle('Authen Practice Basic')
        .setDescription('Tài liệu Apis')
        .setVersion('1.0')

        // Nhập Token
        .addBearerAuth({
            type: 'http',
            bearerFormat: 'JWT',
            description: 'Token Bearer Authentication',
            in: 'header',
            scheme: 'bearer',
        }, 'X-Bearer-Token')

        // TODO
        // Nhập username
        // Nhập password
        .build();
        
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, document);
}