import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepositoryResponse } from './interfaces/repositoryResponse';
import { BcryptUtils } from 'src/common/utils/password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly JWTService: JwtService,
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
  async login(
    loginData: Partial<CreateUserDTO>,
  ): Promise<UserRepositoryResponse> {
    const user = await this.getUserByEmail(loginData.email);

    if (!user.success) {
      return user;
    }

    const hashedPassword: string = await this.passwordUtils.hashPassword(
      user.data.password,
    );
    const status = await this.passwordUtils.comparePasswords(
      user.data.password,
      hashedPassword,
    );

    if (!status) {
      return {
        success: false,
        message: 'Password or email is inccorect',
      };
    }

    const payload: object = { email: user.data.email };

    const token: string = this.JWTService.sign(payload);

    return {
      success: true,
      message: 'Login successful',
      data: { token },
    };
  }
}
