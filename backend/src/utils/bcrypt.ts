import bcrypt from "bcryptjs";

const hashValue = async (value: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(value, salt);
};

const compareValue = async (value: string, hashedValue: string) => {
  return bcrypt.compare(value, hashedValue).catch(() => false);
};

export { hashValue, compareValue };
