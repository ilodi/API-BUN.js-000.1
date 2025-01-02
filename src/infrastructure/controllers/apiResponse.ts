// Respuesta de éxito para obtener una alpaca
export const AlpacaRetrievedOk = {
    code: 'AL20000',
    statusCode: '200',
    message: 'Alpaca retrieved successfully'
};

// Respuesta de éxito para obtener varias alpacas
export const AlpacasRetrievedOk = {
    code: 'AL20001',
    statusCode: '200',
    message: 'Alpacas retrieved successfully'
};

// Respuesta de éxito para crear una alpaca
export const AlpacaCreatedOk = {
    code: 'AL20100',
    statusCode: '201',
    message: 'Alpaca created successfully'
};

// Respuesta de éxito para actualizar una alpaca
export const AlpacaUpdatedOk = {
    code: 'AL20200',
    statusCode: '202',
    message: 'Alpaca updated successfully'
};

// Respuesta de éxito para eliminar una alpaca
export const AlpacaDeletedOk = {
    code: 'AL20400',
    statusCode: '204',
    message: 'Alpaca deleted successfully'
};

// Respuesta de error cuando no se encuentra la alpaca
export const AlpacaNotFound = {
    code: 'AL40400',
    statusCode: '404',
    message: 'Alpaca not found'
};
