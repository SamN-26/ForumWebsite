const express = require('express')
const apiHelper = require('../controllers/api')

const router = express.Router()

router.route('/subgroup/gr/:name/:pass')
.get(apiHelper.getSubgroupGrDetails)
.post(apiHelper.updateSubgroupGr)

router.route('/query-delete/:id')
.delete(apiHelper.deleteQuery)

router.route('/announcement-delete/:id')
.delete(apiHelper.deleteAnnouncement)

router.route('/lecturegroup/cr/:name/:pass')
.get(apiHelper.getLecturegroupCrDetails)
.post(apiHelper.updateLecturegroupCr)

module.exports = router