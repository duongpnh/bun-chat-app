export class SignInResponseDto {
  success: boolean;
  message: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  token: string;
  refreshToken: string;
}