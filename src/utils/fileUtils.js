import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadsDir = path.join(__dirname, '../../uploads');
export const avatarsDir = path.join(uploadsDir, 'avatars');

export const deleteUploadedFile = async (filePath) => {
  if (!filePath || !filePath.startsWith('/uploads/')) return;

  const fullPath = path.join(uploadsDir, filePath.replace('/uploads/', ''));

  try {
    await fs.unlink(fullPath);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
};
