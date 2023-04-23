import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { TypeProduct } from "../create/create.product.dto";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe("Unit test find product use case", () => {
  const product = ProductFactory.create(TypeProduct.A, "Product", 59.9);
  const mockInput = <InputFindProductDto>{
    id: "123",
  };
  let sut: FindProductUseCase;
  const generateProductMockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  });

  it("should find a product", async () => {
    const mockProductRepository = generateProductMockRepository();
    mockProductRepository.find.mockResolvedValueOnce(product);
    sut = new FindProductUseCase(mockProductRepository);
    const outputResult = await sut.execute(mockInput);
    const output = <OutputFindProductDto>{
      id: product.id,
      name: product.name,
      price: product.price
    }

    expect(outputResult).toMatchObject(output);
  });

  it("should not find a product", async () => {
    const mockProductRepository = generateProductMockRepository();
    const errorMessage = "Product not found";
    mockProductRepository.find.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    sut = new FindProductUseCase(mockProductRepository);

    await expect(() => sut.execute(mockInput)).rejects.toThrow(errorMessage);
  });
});
