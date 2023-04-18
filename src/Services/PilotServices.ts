import { AppError } from "../configs/errors";
import { AppMessages, responseService } from "../configs/Messages";
import { Pilot } from "../entities";
import { IPilotRepository } from "../repositories/interfaces";
import { pilotServiceTypes } from "./types";



export class PilotServices {
    constructor(
        private readonly pilotRepository: IPilotRepository
    ) {}

    public async create({name, pilotCertification, age, credits, locationPlanet}: pilotServiceTypes.create): Promise<responseService> {

        AppError.existsError(name, AppMessages.findMessage('ERR003'))
        AppError.existsError(pilotCertification, AppMessages.findMessage('ERR002'))
        AppError.existsError(age, AppMessages.findMessage('ERR001'))
        credits = credits || 0.00
        locationPlanet = locationPlanet || ''

        const pilot = new Pilot(name, pilotCertification, age, credits, locationPlanet)

        if(!pilot.checkIfAgeIsOverYearsOld()) throw new AppError(AppMessages.findMessage('ERR004'))

        if(!pilot.checkPilotCertification()) throw new AppError(AppMessages.findMessage('ERR005'))

        const [checkIfPilotCertificationInUse, checkIfPilotNameInUser] = await Promise.all([
            this.pilotRepository.selectByPilotCertificaiton(pilotCertification), 
            this.pilotRepository.selectByPilotName(name)
        ])

        if(checkIfPilotCertificationInUse) throw new AppError(AppMessages.findMessage('ERR012'))

        if(checkIfPilotNameInUser) throw new AppError(AppMessages.findMessage('ERR011'))

        const insertId = await this.pilotRepository.create({name, pilotCertification, age, credits, locationPlanet})

        const msg = AppMessages.findMessage('MSG001')

        return AppMessages.sendMessageService(msg, {id: insertId})
    }

    public async selectAll(): Promise<pilotServiceTypes.selectAll | null> {
        const pilots = await this.pilotRepository.selectAll()

        return pilots
    }

    public async selectById(idPilot: number): Promise<pilotServiceTypes.selectById> {
        AppError.existsError(idPilot, AppMessages.findMessage('ERR013'))

        const pilot = await this.pilotRepository.selectById(idPilot)

        if(!pilot) throw new AppError(AppMessages.findMessage('ERR014'))

        return pilot
    }

    public async updateById({idPilot, name, pilotCertification, age, credits, locationPlanet}: pilotServiceTypes.update): Promise<responseService> {
        AppError.existsError(idPilot, AppMessages.findMessage('ERR013'))
        AppError.existsError(name, AppMessages.findMessage('ERR003'))
        AppError.existsError(pilotCertification, AppMessages.findMessage('ERR002'))
        AppError.existsError(age, AppMessages.findMessage('ERR001'))

        const pilot = new Pilot(name, pilotCertification, age, credits, locationPlanet)

        if(!pilot.checkIfAgeIsOverYearsOld()) throw new AppError(AppMessages.findMessage('ERR004'))

        if(!pilot.checkPilotCertification()) throw new AppError(AppMessages.findMessage('ERR005'))


        const [checkIfPilotCertificationInUse, checkIfPilotNameInUser] = await Promise.all([
            this.pilotRepository.selectByPilotCertificaiton(pilotCertification), 
            this.pilotRepository.selectByPilotName(name)
        ])

        if(checkIfPilotCertificationInUse && checkIfPilotCertificationInUse.idPilot != idPilot) throw new AppError(AppMessages.findMessage('ERR012'))

        if(checkIfPilotCertificationInUse && checkIfPilotCertificationInUse.idPilot != idPilot) throw new AppError(AppMessages.findMessage('ERR011'))

        const updatedId = await this.pilotRepository.update({name, pilotCertification, age, credits, locationPlanet, idPilot})

        const msg = AppMessages.findMessage('MSG002')

        return AppMessages.sendMessageService(msg, {id: updatedId})
    }

    public async deleteById(idPilot: number): Promise<responseService> {
        AppError.existsError(idPilot, AppMessages.findMessage('ERR013'))

        const checkIfPilotExists = await this.pilotRepository.selectById(idPilot)

        if(!checkIfPilotExists) throw new AppError(AppMessages.findMessage('ERR014'))

        const deleteId = await this.pilotRepository.delete(idPilot)


        const msg = AppMessages.findMessage('MSG003')

        return AppMessages.sendMessageService(msg, {id: deleteId})

    }

}