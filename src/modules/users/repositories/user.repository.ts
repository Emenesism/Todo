import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserRepositoryResponse } from '../interfaces/repositoryResponse';
import { AppLoggerService } from 'src/common/utils/logger.service';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private readonly logger: AppLoggerService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    createUserData: CreateUserDTO,
  ): Promise<UserRepositoryResponse> {
    try {
      const user = await this.save(createUserData);

      if (!user) {
        this.logger.log('Cannot create user with the provided data');
        return {
          success: false,
          message: "Can't create the User",
        };
      }

      this.logger.log('User creation is successful');
      return {
        success: true,
        message: 'Successful',
        data: user,
      };
    } catch (error) {
      this.logger.error('Error occurred during user creation', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getUserById(id: string): Promise<UserRepositoryResponse> {
    try {
      const user = await this.findOne({ where: { id } });

      if (!user) {
        this.logger.log(`User with ID ${id} not found`);
        return {
          success: false,
          message: 'User not found',
        };
      }

      this.logger.log(`User with ID ${id} found successfully`);
      return {
        success: true,
        message: 'Successful',
        data: user,
      };
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching user with ID ${id}`,
        error.message,
      );
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getAllUsers(): Promise<UserRepositoryResponse> {
    try {
      const users = await this.find();

      this.logger.log('Retrieved all users successfully');
      return {
        success: true,
        message: 'Successful',
        data: users,
      };
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching all users',
        error.message,
      );
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getUserByEmail(email: string): Promise<UserRepositoryResponse> {
    try {
      const user = await this.findOne({ where: { email } });

      if (!user) {
        this.logger.log(`User with email ${email} not found`);
        return {
          success: false,
          message: 'User not found',
        };
      }

      this.logger.log(`User with email ${email} found successfully`);
      return {
        success: true,
        message: 'Successful',
        data: user,
      };
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching user with email ${email}`,
        error.message,
      );
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateUser(
    id: string,
    updateData: Partial<CreateUserDTO>,
  ): Promise<UserRepositoryResponse> {
    try {
      const user = await this.findOne({ where: { id } });

      if (!user) {
        this.logger.log(`User with ID ${id} not found`);
        return {
          success: false,
          message: 'User not found',
        };
      }

      const updatedUser = await this.save({ ...user, ...updateData });

      this.logger.log(`User with ID ${id} updated successfully`);
      return {
        success: true,
        message: 'Successful',
        data: updatedUser,
      };
    } catch (error) {
      this.logger.error(
        `Error occurred while updating user with ID ${id}`,
        error.message,
      );
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
