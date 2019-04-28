import { ExampleModel } from './models/example.model';
import { NotFoundException } from "../../utils/exceptions";

export class ExampleService {
	static async findAll () {
		return await ExampleModel.find().exec();
	}

	static async findById (id) {
		const document = await ExampleModel.findById(id);
		if (!document) throw new NotFoundException();
		return document;
	}

	static async addOne (data) {
		return await ExampleModel.create(data);
	}
}
