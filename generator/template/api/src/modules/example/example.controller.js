export class ExampleController {
	static async getIndex (req, res) {
		return res.status(200).json({ message: 'Hello world' });
	}
}
