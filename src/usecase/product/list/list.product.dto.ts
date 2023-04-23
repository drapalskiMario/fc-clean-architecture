export interface InputListProductDto {}

export interface OutputProductDto {
  id: string;
  name: string;
  price: number;
}

export interface OutputListProductDto {
  products: Array<OutputProductDto>;
}
