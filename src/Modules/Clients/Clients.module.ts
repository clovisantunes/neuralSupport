import { Module } from "@nestjs/common";
import { UserAdminController } from "src/Controllers/Users/UserAdmin/UserAdmin.Controller";
import { UserTecController } from "src/Controllers/Users/UserTec/UserTec.controller";
import { UserAdminService } from "src/Services/Users/UserAdmin/userAdmin.service";
import { UserTecService } from "src/Services/Users/UserTec/UserTec.service";



@Module({
    providers: [UserAdminService, UserTecService],
    controllers: [UserAdminController, UserTecController],
    imports: []
})

export class UserAdminModule {}