import { Sequelize } from "sequelize-typescript";
import { InputCreateProductDto, TypeProduct } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Unit test create product use case", () => {
  let sut: CreateProductUseCase;
  let mockInput: InputCreateProductDto;
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();

    mockInput = {
      name: "Product",
      price: 59.9,
      type: TypeProduct.A,
    };
    sut = new CreateProductUseCase(new ProductRepository());
  });

  afterEach(async () => {
    await sequelize.close();
  });

  beforeEach(() => {

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
