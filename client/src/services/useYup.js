import { object, string, number } from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userSchema = object({
  username: string().min(5).required(),
  password: string().min(5).required(),
});

const profileSchema = object({
  userId: number().required(),
  firstName: string().min(2).required(),
  lastName: string().min(2).required(),
  age: number().min(1).max(120).required(),
  gender: string().min(4).required(),
  city: string().min(4).required(),
  email: string().email().required(),
  phone: string().matches(phoneRegExp, "Phone number is not valid"),
});

export async function yupProfileSchema(profileInfo) {
  return await profileSchema.validate(profileInfo);
}

export async function yupUserSchema(user) {
  return await userSchema.validate(user);
}
