

type message = {
    cod: string,
    message: string,
    statusCode: number
}

export type responseService = 
    {
        message: string,
        params: any,
        statusCode: number
    }

export class AppMessages {
    private static getMessages (): message[] {
        return [
            {cod: 'MSG001', message: 'Pilot created successfully!', statusCode: 201},
            {cod: 'MSG002', message: 'Pilot updated successfully!', statusCode: 200},
            {cod: 'MSG003', message: 'Pilot deleted successfully!', statusCode: 200},
            {cod: 'MSG004', message: 'Ship created successfully!', statusCode: 201},
            {cod: 'MSG005', message: 'Ship updated successfully!', statusCode: 200},
            {cod: 'MSG006', message: 'Ship deleted successfully!', statusCode: 200},
            {cod: 'MSG007', message: 'Ship assigned to pilot!', statusCode: 200},
            {cod: 'MSG008', message: 'Ship deallocated to pilot!', statusCode: 200},
            {cod: 'MSG009', message: 'Contract created successfully!', statusCode: 201},
            {cod: 'MSG010', message: 'Contract updated successfully!', statusCode: 200},
            {cod: 'MSG011', message: 'Contract deleted successfully!', statusCode: 200},
            {cod: 'MSG012', message: 'Resource created successfully!', statusCode: 201},
            {cod: 'MSG013', message: 'Resource updated successfully!', statusCode: 200},
            {cod: 'MSG014', message: 'Resource deleted successfully!', statusCode: 200},
            {cod: 'MSG015', message: 'Contract accepted successfully!', statusCode: 200},
            {cod: 'MSG016', message: 'successfully supplied!', statusCode: 200},
            {cod: 'MSG017', message: 'Travel realized successfully!', statusCode: 200},
            {cod: 'MSG018', message: 'Contract delivered  successfully!', statusCode: 200},
            {cod: 'ERR001', message: 'Age is required!', statusCode: 400},
            {cod: 'ERR002', message: 'Pilot certification is required!', statusCode: 400},
            {cod: 'ERR003', message: 'Name is required!', statusCode: 400},
            {cod: 'ERR004', message: 'Age below minimum!', statusCode: 400},
            {cod: 'ERR005', message: 'Certificate is not valid!', statusCode: 400},
            {cod: 'ERR009', message: 'Internal server error!', statusCode: 500},
            {cod: 'ERR011', message: 'Name already in use!', statusCode: 400},
            {cod: 'ERR012', message: 'Certificate already in use!', statusCode: 400},
            {cod: 'ERR013', message: 'id_pilot is required!', statusCode: 400},
            {cod: 'ERR014', message: 'Pilot not found!', statusCode: 400},
            {cod: 'ERR015', message: 'Fuel capacity is required!', statusCode: 400},
            {cod: 'ERR016', message: 'Fuel level is required!', statusCode: 400},
            {cod: 'ERR017', message: 'Weight capacity is required!', statusCode: 400},
            {cod: 'ERR018', message: 'id_ship is required!', statusCode: 400},
            {cod: 'ERR019', message: 'Ship not found!', statusCode: 400},
            {cod: 'ERR019', message: 'Pilot name or pilot certification are from different pilots', statusCode: 403},
            {cod: 'ERR020', message: 'Ships already in use!', statusCode: 400},
            {cod: 'ERR021', message: 'Pilot already allocated in other Ship!', statusCode: 400},
            {cod: 'ERR022', message: 'Description is required!', statusCode: 400},
            {cod: 'ERR023', message: 'Destination planet is required!', statusCode: 400},
            {cod: 'ERR024', message: 'Origin planet is required!', statusCode: 400},
            {cod: 'ERR025', message: 'Value is required!', statusCode: 400},
            {cod: 'ERR026', message: 'id_contract is required!', statusCode: 400},
            {cod: 'ERR027', message: 'Contract not found!', statusCode: 400},
            {cod: 'ERR028', message: 'Description already in use!', statusCode: 400},
            {cod: 'ERR029', message: 'Contract is not open status!', statusCode: 400},
            {cod: 'ERR030', message: 'Weight is required!', statusCode: 400},
            {cod: 'ERR031', message: 'Resource name is not valid!', statusCode: 403},
            {cod: 'ERR032', message: 'Contract is not open status for add resource!', statusCode: 403},
            {cod: 'ERR033', message: 'id_resource is required!', statusCode: 400},
            {cod: 'ERR034', message: 'Resource not found!', statusCode: 400},
            {cod: 'ERR035', message: 'Planet of origin of the contract and the planet on which the pilot is located are different, travel to planet of origin of the contract to accept!', statusCode: 400},
            {cod: 'ERR036', message: 'Ship not found for accept the contract!', statusCode: 400},
            {cod: 'ERR037', message: 'Contract with payload more than wight capacity of ship!', statusCode: 400},
            {cod: 'ERR038', message: 'Pilot has already accepted another contract!', statusCode: 400},
            {cod: 'ERR039', message: 'Fuel quantity is required!', statusCode: 400},
            {cod: 'ERR040', message: 'Pilot doesnt have enough credits!', statusCode: 400},
            {cod: 'ERR041', message: 'Ship does not support this amount of fuel', statusCode: 400},
            {cod: 'ERR042', message: 'Ship has no pilot!', statusCode: 400},
            {cod: 'ERR043', message: 'Travel is not possible', statusCode: 400},
            {cod: 'ERR044', message: 'Travel is not possible with this Ship. Cost travel is greater than the fuel capacity of ship!', statusCode: 400},
            {cod: 'ERR045', message: 'Cost travel is greater than the fuel level of ship!', statusCode: 400},
            {cod: 'ERR046', message: 'Planet has no registry in Intergalactic Federation!', statusCode: 400},

        ]
    }

    static findMessage(cod: string): message {
        const msg = this.getMessages().find( msg => msg.cod === cod) 

        if(!msg) throw {cod: 'ERR1000', msg: 'Erro ao encontrar a mensagem!'}

        return msg
    }

    static sendMessageService(msg: message, params: any): responseService {
        return {
            message: msg.message,
            statusCode: msg.statusCode,
            params
        }
            
    }
}