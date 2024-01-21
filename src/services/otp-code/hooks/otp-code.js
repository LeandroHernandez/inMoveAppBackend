const generateOtp = require("./generate-otp");

module.exports = () => {
  return async context => {
    const { data } = context;
    let response = {};

    console.log('*** generateOtpCode ***');
    console.log(data);

    const { otpOption } = data

    console.log('*** otpOption ***', otpOption);

    if (otpOption === 'create') {
      const resp = await generateOtp(context, data);
      response = resp
    } else if (otpOption === 'validate') {
      response = {
        'message': 'ok for validate'
      };
    }

    context.result = response;
  }
}


