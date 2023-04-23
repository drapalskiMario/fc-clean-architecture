import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  public async execute({ id }: InputFindProductDto) {
    const product = await this.productRepository.find(id);

    return <OutputFindProductDto>{
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
