// te dice donde esta el error
import logger from "pino";
import { AlpacaNotFound } from "../../infrastructure/controllers/apiExceptions";
import alpacaModel, { type AlpacaOutput } from "../../domain/Alpaca/outputModels/alpaca.model";
import * as alpacaRepository from '../../infrastructure/repositories/alpaca.repository'

export const getAlpaca = async (alpacaId: number): Promise<AlpacaOutput> => {
    // start
    const childLog = logger().child({ alpacaId });
    childLog.info('getting alpaca')

    //obtener la alpaca
    const alpaca = await alpacaRepository.get(alpacaId);
    if (!alpaca) {
        childLog.warn('Alpaca not found');
        // Lanzar un error genérico con el objeto AlpacaNotFound
        throw { ...AlpacaNotFound, details: `Alpaca with ID ${alpacaId} not found` };
    }
    

    // end
    childLog.info('Alpaca retrieved successfully')
    return alpacaModel(alpaca);
}

export const getAlpacas = async (): Promise<AlpacaOutput[]> => {
    const childLog = logger().child({});
    childLog.info('Getting all alpacas');
  
    const alpacas = await alpacaRepository.getAll();
  
    childLog.info('Alpacas retrieved successfully');
    return alpacas.map(alpacaModel);
  }

  export const deleteAlpaca = async (alpacaId: number): Promise<void> => {
    const childLog = logger().child({ alpacaId });
    childLog.info('Deleting an alpaca');
  
    const alpaca = await alpacaRepository.get(alpacaId);
    if (alpaca) {
      alpacaRepository.deleteAlpacaById(alpacaId);
    }
  
    childLog.info('Alpaca deleted successfully');
  }