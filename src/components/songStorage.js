// songStorage.js
// -------------------------
// توابع کمکی برای کار با IndexedDB
// -------------------------
import { set, get, del, keys } from "idb-keyval";

/** ذخیرهٔ Blob موسیقی با آیدی دلخواه */
export const saveSongBlob = (id, blob) => set(id, blob);

/** خواندن Blob موسیقی بر اساس آیدی */
export const loadSongBlob = (id) => get(id);

/** حذف Blob موسیقی از IndexedDB */
export const deleteSongBlob = (id) => del(id);

/** گرفتن همهٔ آیدی‌های ذخیره‌شده */
export const listAllSongIds = () => keys();
