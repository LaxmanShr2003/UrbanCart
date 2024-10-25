

import bcrypt from 'bcrypt'

export const comparePassword = async (password, currentPassword) => {
  await bcrypt.compareSync(password, currentPassword);
};