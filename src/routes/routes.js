import express from ('express')
const router =express.Router()

router.route('/test',(req,res,next)=> {
	req.send('tournaments/test reached')
})
router.route('/tournaments');
router.route('/tournament-rank');
router.route('/tournament-scores');

export default(dbRouter)
