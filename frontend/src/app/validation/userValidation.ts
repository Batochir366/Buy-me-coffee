import * as Yup from "yup";

export const userSchema = Yup.object({
  username: Yup.string().required().min(2, "dood taln 2 shuu"),
  email: Yup.string().min(2, "email").required(),
  password: Yup.string().required(),
});
