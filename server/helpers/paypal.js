const paypal = require ('paypal-rest-sdk');
paypal.configure({
    mode : 'sandbox',
    client_id : "AWz9GqnvFpTQ7OMnFGJjPkulxc38Kvx6Hya5TZ7GauZxC79hssu3t5eGNSR93e4QNy0JHpAp_Uh80yO9",
    client_secret : "EOEPkGJJNBQxWow1bPyR6ula2Zr1_NKa5EuktIrAWn3HKZfB8th8HRXSUBcAzQp5LX-94R-4PhZoSdB9",
});


module.exports = paypal;