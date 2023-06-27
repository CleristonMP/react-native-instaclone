import {useEffect, useRef} from 'react';

const useEffectIfNot = (func: () => void, deps: any[], values: any[]) => {
  const firstRun = useRef(false);

  useEffect(() => {
    let shouldRun = true;
    if (firstRun.current) {
      if (deps.length === values.length) {
        deps.forEach((value: any, index: number) => {
          if (value === values[index]) {
            shouldRun = false;
          }
        });
      }
      if (shouldRun) {
        func();
      }
    } else {
      firstRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useEffectIfNot;
