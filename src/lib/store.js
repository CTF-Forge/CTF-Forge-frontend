import { writable } from 'svelte/store';

export const user = writable(null);

export const toast = writable({ show: false, message: '', type: 'info' });

// タイムアウトIDを保持する変数を定義
let timeoutId;

export function showToast(message, type = 'info') {
  // 既存のタイマーがあればクリアする
  clearTimeout(timeoutId);

  toast.set({ show: true, message, type });

  // 新しいタイマーをセットし、そのIDを保存する
  timeoutId = setTimeout(() => {
    toast.set({ show: false, message: '', type: 'info' });
  }, 3000);
}
