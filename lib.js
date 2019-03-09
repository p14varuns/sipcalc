
var summary = (lumpsum, sip, increase, rate, duration) => {
    var numMonths = duration * 12;
    var monthlyRate = Math.pow((1 + rate/100),1/12);
    var expected = 100 * parseInt(lumpsum); // lumpsum is entered in lacs
    var invested = 100 * parseInt(lumpsum);

    var sipAmount = parseInt(sip);
    for(var i = 1; i <= numMonths; i++){
        if(i % 12 == 0)
            sipAmount = sipAmount * (1+increase/100)
        invested = invested + sipAmount;
        expected = expected * monthlyRate + sipAmount;
    }
    
    return {
        "expected": expected.toFixed(0) / 100,
        "invested": invested.toFixed(0) / 100,
        "gain": (expected - invested).toFixed(0) / 100,
      };
}


module.exports = {
    summary
}
  