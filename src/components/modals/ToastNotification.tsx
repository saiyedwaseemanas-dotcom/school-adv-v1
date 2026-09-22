import React from 'react';
import { ToastState } from '../../types';

interface ToastNotificationProps {
  toast: ToastState | null;
  onDismiss: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onDismiss,
}) => {
  if (!toast) return null;

  return (
    <div className="fixed top-20 inset-x-4 z-50 max-w-sm mx-auto p-3 rounded-2xl bg-[#283044] text-[#eef0ff] shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="material-symbols-outlined text-[#c3c0ff] text-[20px] shrink-0">
          {toast.icon || 'check_circle'}
        </span>
        <span className="text-xs font-medium truncate">{toast.message}</span>
      </div>
      <button
        className="text-[#c3c0ff] hover:text-white p-1 cursor-pointer shrink-0"
        onClick={onDismiss}
        type="button"
        aria-label="Dismiss Notification"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
