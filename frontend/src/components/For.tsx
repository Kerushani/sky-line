//similar to solidjs For tag

import { ReactNode, Fragment } from "react";

interface ForProps<T, U extends ReactNode> {
  each: readonly T[];
  fallback?: ReactNode;
  children: (item: T, index: number) => U;
}

const For = <T, U extends ReactNode>({
  each,
  fallback,
  children,
}: ForProps<T, U>) => {
  if (each.length === 0) {
    return <>{fallback}</>;
  }
  return (
    <>
      {each.map((item, index) => (
        <Fragment key={index}>{children(item, index)}</Fragment>
      ))}
    </>
  );
};

export default For;
