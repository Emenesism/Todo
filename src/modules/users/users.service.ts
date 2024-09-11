import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepositoryResponse } from './interfaces/repositoryResponse';
import { BcryptUtils } from 'src/common/utils/password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordUtils: BcryptUtils,
  ) {}

  async createUser(
    createUserData: CreateUserDTO,
  ): Promise<UserRepositoryResponse> {
    return this.userRepository.createUser(createUserData);
  }

  async getUserById(id: string): Promise<UserRepositoryResponse> {
    return this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<UserRepositoryResponse> {
    return this.userRepository.getAllUsers();
  }

  async getUserByEmail(email: string): Promise<UserRepositoryResponse> {
    return this.userRepository.getUserByEmail(email);
  }

  async updateUser(
    id: string,
    updateData: Partial<CreateUserDTO>,
  ): Promise<UserRepositoryResponse> {
    return this.userRepository.updateUser(id, updateData);
  }

  async signup(signupData: CreateUserDTO): Promise<UserRepositoryResponse> {
    const hashedPassword = await this.passwordUtils.hashPassword(
      signupData.password,
    );

    const userCreationData = {
      ...signupData,
      password: hashedPassword,
    };

    return this.userRepository.createUser(userCreationData);
  }
}
