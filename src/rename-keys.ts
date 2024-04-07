type RenameMap<T> = Partial<Record<keyof T, PropertyKey>>;

type RenamedKeys<T, M extends RenameMap<T>> = {
  [K in keyof T]: K extends keyof M ? { name: M[K]; t: T[K] } : never;
}[keyof T];

type Replace<T, M extends RenameMap<T>> = Omit<T, keyof M> &
  {
    [K in Exclude<M[keyof M], undefined>]: Extract<RenamedKeys<T, M>, { name: K }>["t"];
  };

type f = RenamedKeys<Foo, { a: "newA" }>;

function rename<T, M extends RenameMap<T>>(t: T, mapped: M): Replace<T, M> {
  return t as any;
}

interface Foo {
  a: number;
  b: string;
  c: number;
}

const f: Foo = null!;
const g = rename(f, { a: "newA", b: "newB" });
g.newA = 2;
g.newB = "2";
g.c = 3;
