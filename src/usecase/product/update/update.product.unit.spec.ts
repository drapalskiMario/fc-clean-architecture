import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { TypeProduct } from "../create/create.product.dto";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("Unit test update product use case", () => {
  const product = ProductFactory.create(TypeProduct.A, "Product", 59.00)
  let sut: UpdateProductUseCase;
  let mockInput: InputUpdateProductDto;
  const generateProductMockRepository = () => ({
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  });

  beforeEach(() => {
    mockInput = {
      id: product.id,
      name: "Changed Product",
      price: 60,
    };
    sut = new UpdateProductUseCase(generateProductMockRepository());
  });

  it("should create a product", async () => {
    const outputResult = await sut.execute(mockInput);

    expect(outputResult).toMatchObject(mockInput);
  });
});
 