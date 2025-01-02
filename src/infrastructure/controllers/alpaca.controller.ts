import { response, type Request, type Response } from 'express';
import { AlpacaRetrievedOk, AlpacaNotFound, AlpacaDeletedOk } from './apiResponse';  // Agrega la respuesta de AlpacaNotFound si aún no la tienes
import * as alpacaRepository from '../repositories/alpaca.repository';
import type { AlpacaOutput } from '../../domain/Alpaca/outputModels/alpaca.model';
import * as alpacaUsecase from '../../usecases/alpaca/alpaca.usecase'

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


export const getAlpacas = async (req: Request, res: Response): Promise<AlpacaOutput[]> => {
    try {
        const alpacas = await alpacaUsecase.getAlpacas();
        res.json({response: AlpacaRetrievedOk, data: alpacas})
    } catch (error) {
        res.json({response: error})   
    }
}

export const deleteAlpaca = async (req: Request, res: Response) => {
    const alpacaId: number = parseInt(req.params.alpacaId);
    try {
      await alpacaUsecase.deleteAlpaca(alpacaId);
      res.json({ response: AlpacaDeletedOk });  
    } catch(error) {
      res.json({ response: error });
    }
  }