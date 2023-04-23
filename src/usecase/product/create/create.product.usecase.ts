import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export default class CreateProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  public async execute({ type, name, price }: InputCreateProductDto) {
    const product = ProductFactory.create(type, name, price);

    await this.productRepository.create(<Product>{
      id: product.id,
      name: product.name,
      price: product.price,
    });

    return <OutputCreateProductDto>{
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
