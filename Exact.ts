// T is the exact type, U is the user's passed type
export type Exact2<T, U> = T &
  {
    [K in keyof U]: K extends keyof T
      ? T[K] extends Array<infer TU> | undefined | null
        ? U[K] extends Array<infer UU> | undefined | null
          ? Array<Exact2<TU, UU>> | undefined | null
          : never
        : U[K]
      : never;
  };

export type Exact<T, U> = U &
  {
    [K in keyof U & keyof T]: U[K] extends Array<infer UU>
      ? T[K] extends Array<infer TU> | null | undefined
        ? UU extends TU
          ? Array<Exact<TU, UU>> | null | undefined
          : never
        : never
      : U[K];
  } &
  {
    [K in Exclude<keyof U, keyof T>]: never;
  };

type ExactInner<T> = <D>() => (D extends T ? D : D);
export type Exact3<T> = ExactInner<T> & T;
