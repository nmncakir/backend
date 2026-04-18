import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from "../generated/auth";

export interface GrpcClientConfigOptions {
    authServiceUrl: string; 
}

@Module({})
export class GrpcClientModule {
    static forRoot(config: GrpcClientConfigOptions): DynamicModule {
        return {
            module: GrpcClientModule,
            global: true,
            imports: [
                ClientsModule.register([
                    {
                        name: AUTH_SERVICE_NAME,
                        transport: Transport.GRPC,
                        options: {
                            url: config.authServiceUrl,
                            package: AUTH_PACKAGE_NAME,
                            protoPath: join(process.cwd(), 'libs/grpc/proto/auth.proto'),
                        },
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}