import { body } from 'express-validator';

export const registerValidation = [
  body("email", 'не правильний формат пошти').isEmail(),
  body("password", 'пароль повинен бути мінімум 5 слів').isLength({ min: 5 }),
  body("fullName", 'вкажіть імя').isLength({ min: 3 }),
  body("avatarUrl", 'не правильна ссилка').optional().isURL(),
];

export const loginValidation = [
  body("email", 'не правильний формат пошти').isEmail(),
  body("password", 'пароль повинен бути мінімум 5 слів').isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", 'введіть заголовок').isLength({ min: 3}).isString(),
  body("text", 'неправильний теск').isLength({ min: 3 }).isString(),
  body("tags", 'неправильний формат тега').optional().isString(),
  body("imageUrl", 'неправильна ссилка або зображення').optional().isString(),
];
