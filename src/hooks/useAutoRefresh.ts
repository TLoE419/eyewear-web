// 自動刷新 Hook
import { useEffect, useRef } from "react";

interface UseAutoRefreshOptions {
  interval?: number; // 刷新間隔（毫秒）
  enabled?: boolean; // 是否啟用自動刷新
}

export const useAutoRefresh = (
  callback: () => void,
  options: UseAutoRefreshOptions = {}
) => {
  const { interval = 30000, enabled = true } = options; // 預設 30 秒
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // 更新 callback 引用（移除依賴，避免無限循環）
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;

    intervalRef.current = setInterval(() => {
      callbackRef.current();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [interval, enabled]); // 移除 callback 依賴

  // 手動刷新
  const refresh = () => {
    callbackRef.current();
  };

  return { refresh };
};
