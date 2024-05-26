// 引数の型から一つを必須にする
export type RequireOne<T> = {
  [Key in keyof T]: Required<Pick<T, Key>> & Partial<Omit<T, Key>>;
}[keyof T];

// オブジェクトからキー名でユニオン型を作成
// export type KeysOf<T> = keyof T;
