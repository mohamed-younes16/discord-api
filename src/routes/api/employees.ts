import { Router } from "express"

const router = Router()

const rolesList = require("../../config/roles_list")
const { getallemps, postemps, patchemps, deleteemps, getspecificemp } = require("../../controllers/employeescontroller")
const verifyJWT = require("../../middleware/verifyJWT")
const verifyRoles = require("../../middleware/verifyRoles")






router.route("/").get(verifyJWT,verifyRoles(rolesList.user),getallemps  )
.post(verifyJWT,verifyRoles(rolesList.admin,rolesList.editor),postemps)
.patch(verifyJWT,verifyRoles(rolesList.admin,rolesList.editor),patchemps)
.delete(verifyJWT,verifyRoles(rolesList.admin,rolesList.editor),deleteemps)



router.get('/:id', getspecificemp )    





module.exports = router