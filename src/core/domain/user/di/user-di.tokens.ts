export class UserDITokens {
  
    // Use-cases
    
    public static readonly CreateUserUseCase: unique symbol  = Symbol('CreateUserUseCase');
    public static readonly GetUserUseCase: unique symbol     = Symbol('GetUserUseCase');
    
    // Handlers
    
    
    // Repositories
    
    public static readonly UserRepository: unique symbol  = Symbol('UserRepository');
    
  }