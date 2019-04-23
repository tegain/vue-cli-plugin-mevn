import express from 'express';
import { ExampleController } from './example.controller';

export const ExampleModule = express.Router();

ExampleModule.get('/', ExampleController.getIndex);
