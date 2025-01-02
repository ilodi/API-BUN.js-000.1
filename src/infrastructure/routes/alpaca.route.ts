import express from 'express';
const router = express.Router();
import * as alpacaController from '../controllers/alpaca.controller';

router.get('/alpacas/:alpacaId', alpacaController.getAlpaca);

export default router;