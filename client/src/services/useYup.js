import { object, string, number } from "yup";

const personalSchema = object({
  userId: number().required(),
  firstName: string().min(2).required(),
  lastName: string().min(2).required(),
  age: number().min(1).max(120).required(),
  gender: string().min(4).required(),
  city: string().min(4).required(),
});

const contactSchema = object({
  userId: number().required(),
  email: string().email().required(),
  phone: string().min(10).max(10).required(),
});

export async function yupPersonalSchema(personalInfo) {
  return await personalSchema.validate(personalInfo);
}

export async function yupContactSchema(contactInfo) {
  return await contactSchema.validate(contactInfo);
}
