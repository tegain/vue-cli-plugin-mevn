import { ObjectId } from 'mongodb';
import { ExampleService } from './example.service';
import { BadRequestException } from '../../utils/exceptions';

export class ExampleController {
	static async getAll (req, res) {
		const users = await ExampleService.findAll();
		return res.status(200).json(users);
	}

	static async getOne (req, res) {
		try {
			const { id } = req.params;

			if (!id || !ObjectId.isValid(id)) {
				throw new BadRequestException('Invalid ID');
			}

			const users = await ExampleService.findById(id);
			return res.status(200).json(users);
		} catch (e) {
			return res.status(e.status).json(e.message);
		}
	}

	static async addOne (req, res) {
		const user = await ExampleService.addOne(req.body);
		return res.status(201).json(user);
	}
}
