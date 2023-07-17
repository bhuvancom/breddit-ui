export default class DataState<T> {
  setLoading(isLoading: boolean): DataState<T | undefined> {
    this.isLoading = isLoading;
    return this;
  }
  setError(error: string): DataState<T | undefined> {
    this.error = error;
    return this;
  }

  setData(data: T): DataState<T | undefined> {
    this.data = data;
    return this;
  }
  public data: T | null;
  public error: string = '';
  public isLoading: boolean = false;
  constructor(options: Partial<DataState<T>> = {}) {
    this.data = options.data ?? null;
    this.error = options.error ?? '';
    this.isLoading = options.isLoading ?? false;
  }
}
