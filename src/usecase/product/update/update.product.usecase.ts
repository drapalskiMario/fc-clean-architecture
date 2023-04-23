import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  public async execute({ id, name, price }: InputUpdateProductDto) {
    const product = await this.productRepository.find(id);

    product.changeName(name);
    product.changePrice(price);

    await this.productRepository.update(product);

    return <OutputUpdateProductDto>{
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
