import { Module } from "@nestjs/common";
import { UserModule } from "infrastructure/user/modules/user.module";
import { AppController } from "../controllers/app.controller";

@Module({
	imports: [UserModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
