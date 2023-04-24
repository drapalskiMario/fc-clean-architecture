import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { TypeProduct } from "../create/create.product.dto";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("Unit test update product use case", () => {
  const product = ProductFactory.create(TypeProduct.A, "Product", 59.0);
  let sut: UpdateProductUseCase;
  let mockInput: InputUpdateProductDto;
  let sequelize: Sequelize;
  let productRepository: ProductRepository;

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

  beforeEach(() => {
    mockInput = {
      id: product.id,
      name: "Changed Product",
      price: 60,
    };
    productRepository = new ProductRepository();
    sut = new UpdateProductUseCase(productRepository);
  });

  it("should update a product", async () => {
    await productRepository.create(product as Product);

    const outputResult = await sut.execute(mockInput);

    expect(outputResult).toMatchObject(mockInput);
  });
});
