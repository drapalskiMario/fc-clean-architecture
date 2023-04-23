import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, TypeProduct } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe("Unit test create product use case", () => {
  let sut: CreateProductUseCase;
  let mockInput: InputCreateProductDto;
  const generateProductMockRepository = () =>
    <ProductRepositoryInterface>{
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

  beforeEach(() => {
    mockInput = {
      name: "Product",
      price: 59.9,
      type: TypeProduct.A,
    };
    sut = new CreateProductUseCase(generateProductMockRepository());
  });

  it("should create a product", async () => {
    const outputResult = await sut.execute(mockInput);

    expect(outputResult).toMatchObject({
      id: expect.any(String),
      name: mockInput.name,
      price: mockInput.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    mockInput.name = "";

    await expect(sut.execute(mockInput)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    mockInput.price = -1;

    await expect(sut.execute(mockInput)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });

  it("should throw an error when type is not supported", async () => {
    mockInput.type = "c" as any;

    await expect(sut.execute(mockInput)).rejects.toThrow(
      "Product type not supported"
    );
  });
});
