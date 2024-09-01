const postSubGroupInfo = async (req, res) =>{
    console.log(req.body)
    return res.send('Subgroup post')
}

module.exports = {postSubGroupInfo}