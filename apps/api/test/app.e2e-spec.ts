import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { AppModule } from "infrastructure/app/modules/app.module";
import * as request from "supertest";

describe("AppController (e2e)", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("Should launch the application and respond on /", () => {
		return request(app.getHttpServer())
			.get("/ping")
			.expect(200)
			.expect((res) => {
				expect(res.text).toBe("pong");
			});
	});
});
