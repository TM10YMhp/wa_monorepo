import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const PREFIX = "whatsapp-clone-";
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
