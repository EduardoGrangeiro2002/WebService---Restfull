import { Router } from "express";
import pilotRouter from "./pilot.routes"
import shipRouter from './ship.routes'
import contractRouter from './contract.routes'
import resourceRouter from './resource.routes'
import reportsRouter from './report.routes'

class Routes {
    static define(router: Router) {
        router.use('/pilot', pilotRouter)
        router.use('/ship', shipRouter)
        router.use('/contract', contractRouter)
        router.use('/resource', resourceRouter)
        router.use('/reports', reportsRouter)

        return router
    }
}

export default Routes.define(Router());
