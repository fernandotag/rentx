import { type Repository } from "typeorm";

import { type ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { dataSource } from "@shared/infra/typeorm";

import { CarImage } from "../entities/CarImage";

class CarsImageRepository implements ICarsImageRepository {
  private readonly repository: Repository<CarImage>;

  constructor() {
    this.repository = dataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImageRepository };
