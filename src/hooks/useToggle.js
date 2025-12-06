import { useCallback, useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(Boolean(initialValue));

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return { value, toggle };
};

export default useToggle;
