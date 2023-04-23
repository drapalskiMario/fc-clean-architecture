export enum TypeProduct {
  A = "a",
  B = "b",
}

export interface InputCreateProductDto {
  type: TypeProduct;
  name: string;
  price: number;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}
