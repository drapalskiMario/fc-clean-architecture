import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { TypeProduct } from "../create/create.product.dto";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("Unit test list product use case", () => {
  const productOne = ProductFactory.create(TypeProduct.A, "Product", 59.9);
  const productTwo = ProductFactory.create(TypeProduct.A, "Product", 59.9);
  let sut: ListProductUseCase;
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    sut = new ListProductUseCase(productRepository);

    await productRepository.create(productOne as Product);
    await productRepository.create(productTwo as Product);

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
