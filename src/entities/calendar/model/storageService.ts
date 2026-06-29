export class StorageService<T> {
  private key: string;
  private defaultValue: T;

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  get(): T {
    const data = localStorage.getItem(this.key);

    return data ? JSON.parse(data) : this.defaultValue;
  }

  set(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}
