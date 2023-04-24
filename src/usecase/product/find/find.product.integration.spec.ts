import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { TypeProduct } from "../create/create.product.dto";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Unit test find product use case", () => {
  const product = ProductFactory.create(
    TypeProduct.A,
    "Product",
    59.9
  ) as Product;
  let mockInput: InputFindProductDto;
  let sut: FindProductUseCase;
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
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    mockInput = {
      id: product.id,
    };

    sut = new FindProductUseCase(productRepository);

    const outputResult = await sut.execute(mockInput);
    const output = <OutputFindProductDto>{
      id: product.id,
      name: product.name,
      price: product.price,
    };

    expect(outputResult).toMatchObject(output);
  });

  it("should not find a product", async () => {
    const productRepository = new ProductRepository();
    const errorMessage = "Product not found";

    sut = new FindProductUseCase(productRepository);

    await expect(() => sut.execute(mockInput)).rejects.toThrow(errorMessage);
  });
});
