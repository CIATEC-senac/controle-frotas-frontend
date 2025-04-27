import { useEffect, useRef } from 'react';
import {
  createSearchParams,
  SetURLSearchParams,
  URLSearchParamsInit,
  useSearchParams,
} from 'react-router';

// Reference: https://stackoverflow.com/a/78352882
export const useSearchParamsWithUpdate = (
  defaultInit: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSearchParams = useRef(createSearchParams(defaultInit));

  useEffect(() => {
    const update: Record<string, string> = {};
    let needUpdate = false;

    defaultSearchParams.current.forEach((v: string, k: string) => {
      if (!searchParams.has(k)) {
        update[k] = v;
        needUpdate = true;
      }
    });

    if (needUpdate) setSearchParams(update, { replace: true });
  }, [searchParams, setSearchParams]);

  return [searchParams, setSearchParams];
};
