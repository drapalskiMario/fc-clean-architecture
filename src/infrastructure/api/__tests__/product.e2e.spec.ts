import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { TypeProduct } from "../../../usecase/product/create/create.product.dto";
import ProductModel from "../../product/repository/sequelize/product.model";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all product", async () => {
    const productOne = ProductFactory.create(
      TypeProduct.A,
      "Product One",
      59.9
    );
    const productTwo = ProductFactory.create(
      TypeProduct.A,
      "Product Two",
      60.0
    );
    const productRepository = new ProductRepository();

    await productRepository.create(productOne as Product);
    await productRepository.create(productTwo as Product);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1.id).toBe(productOne.id);
    expect(product1.name).toBe(productOne.name);
    expect(product1.price).toBe(productOne.price);
    const product2 = listResponse.body.products[1];
    expect(product2.id).toBe(productTwo.id);
    expect(product2.name).toBe(productTwo.name);
    expect(product2.price).toBe(productTwo.price);

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<id>${productOne.id}</id>`);
    expect(listResponseXML.text).toContain(`<name>${productOne.name}</name>`);
    expect(listResponseXML.text).toContain(`<price>${productOne.price}</price>`);
    expect(listResponseXML.text).toContain(`<id>${productTwo.id}</id>`);
    expect(listResponseXML.text).toContain(`<name>${productTwo.name}</name>`);
    expect(listResponseXML.text).toContain(`<price>${productTwo.price}</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
