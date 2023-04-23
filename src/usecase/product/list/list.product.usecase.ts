import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  OutputListProductDto,
  OutputProductDto,
} from "./list.product.dto";

export default class ListProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  public async execute() {
    const productsModel = await this.productRepository.findAll();

    const products = productsModel.map(
      ({ id, name, price }) =>
        <OutputProductDto>{
          id: id,
          name: name,
          price: price,
        }
    );

    return <OutputListProductDto>{ products };
  }
}
