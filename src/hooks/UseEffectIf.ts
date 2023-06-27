import {useEffect, useRef} from 'react';

const useEffectIf = (func: () => void, dep: any, value: any) => {
  const firstRun = useRef(false);

  useEffect(() => {
    if (firstRun.current && dep === value) {
      func();
    } else {
      firstRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
};

export default useEffectIf;
