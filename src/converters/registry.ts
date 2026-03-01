import { PropertyConverter } from '../types/mgr-types';

export class ConverterRegistry {
  private converters: PropertyConverter[] = [];

  register(converter: PropertyConverter): void {
    this.converters.push(converter);
  }

  getAll(): PropertyConverter[] {
    return [...this.converters];
  }

  getById(id: string): PropertyConverter | undefined {
    return this.converters.find(c => c.id === id);
  }
}
