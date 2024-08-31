import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignInDto } from "../auth/dto/sign-in.dto";
import { AuthenticationService } from "../auth/auth.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { AuthType } from "../auth/enums/auth-type.enum";

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthenticationService) {}

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto);
    }
}