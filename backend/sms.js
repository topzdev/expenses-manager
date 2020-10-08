const request = require('request')

module.exports.send = (mobileNumber, message) => {
    const shortCode = '21588750'
    const accessToken = 'F3QtyvJDd2Yk_mOmNdCHru49RMXEI1vD019926avcjw'
    const clientCorrelator = '264801'

    const options = {
        method: 'POST',
        url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortCode + '/requests',
        qs: { 'access_token': accessToken },
        headers: { 'Content-Type': 'application/json' },
        body: {
            'outboundSMSMessageRequest': { 
                'clientCorrelator': clientCorrelator,
                'senderAddress': shortCode,
                'outboundSMSTextMessage': { 'message': message },
                'address': mobileNumber 
            } 
        },
        json: true 
    }

    request(options, (error, response, body) => {
        if (error) throw new Error(error)
        console.log(body)
    })
}