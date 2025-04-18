export type FormAttr<T> = {
  data: T;
  onSuccess: VoidFunction;
  onFailure: VoidFunction;
};
