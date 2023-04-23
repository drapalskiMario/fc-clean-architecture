import ProductFactory from "../../../domain/product/factory/product.factory";
import { TypeProduct } from "../create/create.product.dto";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test list product use case", () => {
  const productOne = ProductFactory.create(TypeProduct.A, "Product", 59.9);
  const productTwo = ProductFactory.create(TypeProduct.A, "Product", 59.9);
  let sut: ListProductUseCase;
  const generateProductMockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValueOnce([productOne, productTwo]),
    create: jest.fn(),
    update: jest.fn(),
  });

  it("should list a product", async () => {
    sut = new ListProductUseCase(generateProductMockRepository());

    const outputResult = await sut.execute();

    expect(outputResult.products.length).toBe(2);
    expect(outputResult.products[0].id).toBe(productOne.id);
    expect(outputResult.products[0].name).toBe(productOne.name);
    expect(outputResult.products[0].price).toBe(productOne.price);
    expect(outputResult.products[1].id).toBe(productTwo.id);
    expect(outputResult.products[1].name).toBe(productTwo.name);
    expect(outputResult.products[1].price).toBe(productTwo.price);
  });
});
