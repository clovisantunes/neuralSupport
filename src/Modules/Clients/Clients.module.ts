import { Module } from "@nestjs/common";
import { UserAdminController } from "src/Controllers/Clients/UserAdmin.Controller";
import { UserAdminService } from "src/Services/Clients/userAdmin.service";



@Module({
    providers: [UserAdminService],
    controllers: [UserAdminController],
    imports: []
})

export class UserAdminModule {}