// te dice donde esta el error
import logger from "pino";
import { AlpacaNotFound } from "../../infrastructure/controllers/apiExceptions";
import alpacaModel, { type AlpacaOutput } from "../../domain/Alpaca/outputModels/alpaca.model";
import { getAlpacaFromDB } from "../../infrastructure/repositories/alpaca.repository";

export const getAlpaca = async (alpacaId: number): Promise<AlpacaOutput> => {
    // start
    const chilgLog = logger().child({ alpacaId });
    chilgLog.info('getting alpaca')

    //obtener la alpaca
    const alpaca = await getAlpacaFromDB(alpacaId);
    if(!alpaca){
        chilgLog.info('Alpaca not found');
        // lanzar un error
        throw AlpacaNotFound;
    }

    // end
    chilgLog.info('Alpaca retrieved successfully')
    return alpacaModel(alpaca);
}