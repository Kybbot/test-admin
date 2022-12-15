import { useState } from 'react';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type AwaitUnwrap<T> = T extends Promise<infer U> ? U : T;

export default function useFetch<F extends (...args: any) => Promise<any>>(
  fetch: F,
  startOnInit = false): [
    {
      isPending: boolean;
      isError: boolean;
      result?: AwaitUnwrap<AwaitUnwrap<ReturnType<F>>>;
    },
    (...args: ArgumentTypes<F>) => Promise<ReturnType<F>>] {
  const [isPending, setIsPending] = useState(startOnInit);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState<AwaitUnwrap<AwaitUnwrap<ReturnType<F>>>>();

  const execute = async (...args: ArgumentTypes<F>[]): Promise<ReturnType<F>> => {
    try {
      setIsPending(true);
      setIsError(false);

      const data = await fetch(...args);

      setResult(data);
      setIsPending(false);

      return data;
    } catch (e) {
      console.error(e);

      setIsPending(false);
      setIsError(true);

      throw e;
    }
  };

  return [{ isPending, isError, result }, execute];
}
