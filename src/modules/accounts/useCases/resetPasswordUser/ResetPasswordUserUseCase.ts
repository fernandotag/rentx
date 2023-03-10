import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private readonly usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private readonly dateProvider: IDateProvider,

    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (userToken == null) throw new AppError("Token invalid!");

    if (this.dateProvider.isBefore(userToken.expires_date, new Date()))
      throw new AppError("Token expired!");

    const user = await this.usersRepository.findById(userToken.user_id);

    if (user == null) throw new AppError("User not found!");

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
