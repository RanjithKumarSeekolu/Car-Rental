import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

async function fileToCompressedDataUrl(file, maxEdge = 1200, quality = 0.82) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas.toDataURL('image/jpeg', quality);
}

/** Prefer Firebase Storage; fall back to a compressed data URL so the listing keeps a photo. */
export async function uploadCarImage(file) {
  if (!file) return '';

  try {
    const path = `cars/${Date.now()}_${file.name.replace(/\s/g, '_')}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (err) {
    console.warn('Firebase Storage upload failed, using compressed data URL:', err.message);
    return await fileToCompressedDataUrl(file);
  }
}
