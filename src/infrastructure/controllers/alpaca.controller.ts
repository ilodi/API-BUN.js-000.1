import type { Request, Response } from 'express';
import { AlpacaRetrievedOk, AlpacaNotFound } from './apiResponse';  // Agrega la respuesta de AlpacaNotFound si aún no la tienes
import * as alpacaRepository from '../repositories/alpaca.repository';

export const getAlpaca = async (req: Request, res: Response) => {
    const alpacaId: number = parseInt(req.params.alpacaId);

    try {
        const alpaca = await alpacaRepository.getAlpacaFromDB(alpacaId);
        
        // Si no se encuentra la alpaca, respondemos con un error 404
        if (!alpaca) {
            return res.status(404).json({
                response: AlpacaNotFound,
                data: null
            });
        }

        // Respuesta exitosa con la alpaca
        res.status(200).json({
            response: AlpacaRetrievedOk,
            data: alpaca
        });
    } catch (error) {
        // Si ocurre algún otro error (por ejemplo, de la base de datos)
        res.status(500).json({
            response: {
                code: 'AL50000',
                statusCode: '500',
                message: 'Internal Server Error'
            },
            data: null
        });
    }
};
