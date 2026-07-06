export { default as apiClient } from './apiClient';
export { default as propertyService } from './propertyService';
export { default as messageService } from './messageService';
export { default as uploadService } from './uploadService';
export { default as analyticsService } from './analyticsService';
export { default as settingsService } from './settingsService';
export * from './authServices';

// Re-export types for convenience
export type {
  CreatePropertyDto,
  UpdatePropertyDto,
} from './propertyService';

export type {
  CreateMessageDto,
  UpdateMessageDto,
  MessageReplyDto,
} from './messageService';

export type {
  LoginCredentials,
  AuthResponse,
} from './authServices';