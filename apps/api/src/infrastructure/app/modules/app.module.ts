import { Module } from "@nestjs/common";
import { UserModule } from "infrastructure/user/modules/user.module";

@Module({
	imports: [UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
