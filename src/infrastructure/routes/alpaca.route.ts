// alpacaRoutes.ts
import express from 'express';
import * as alpacaController from '../controllers/alpaca.controller';

const router = express.Router();

router.get('/alpacas/:alpacaId', alpacaController.getAlpaca);
router.get('/alpacas', alpacaController.getAlpacas);
router.delete('/alpacas/:alpacaId', alpacaController.deleteAlpaca);


export default router;
