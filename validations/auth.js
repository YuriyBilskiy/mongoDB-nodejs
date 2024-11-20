import { body } from 'express-validator';

export const registerValidation = [
  body("email", 'не правильний формат пошти').isEmail(),
  body("password", 'пароль повинен бути мінімум 5 слів').isLength({ min: 5 }),
  body("fullName", 'вкажіть імя').isLength({ min: 3 }),
  body("avatarUrl", 'не правильна ссилка').optional().isURL(), // Використовуйте isURL, а не isUrl
];