import type { Request, Response } from 'express';
import { AlpacaRetievedOk } from './apiResponse';
import * as alpacaRepository from '../repositories/alpaca.repository';

export const getAlpaca = async (req: Request, res: Response) => {
    const alpacaId: number = parseInt(req.params.alpacaId);

    //por si hay errores, en nuestra respuesta
    try {
        const alpaca = await alpacaRepository.getAlpacaFromDB(alpacaId);
        // manda una respuesta y un codigo
        res.json({ response: AlpacaRetievedOk, data: alpaca });
    } catch (error) {
        res.json({ response: error })
    }
}