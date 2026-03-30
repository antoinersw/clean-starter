// packages/application/src/create-user.ts
export interface UserRepository {
    create(email: string): Promise<void>;
  }
  
  export class CreateUser {
    constructor(private repo: UserRepository) {}
  
    execute(email: string) {
      return this.repo.create(email);
    }
  }