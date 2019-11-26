// var calc = require("./demo.js").calc;
var calc = require("./demo.js");
var expect = require("chai").expect;

describe('函数的测试',function(){
    it("正确的输出", function(){
        expect(calc()).to.be.equal("calc start...\n"+
        "Statement for BigCo\n"+
        "\thamlet: $650.00 (55 seats)\n"+
        "\tAs you like it: $490.00 (35 seats)\n"+
        "\totherllo: $500.00 (40 seats)\n"+
        "Amount owed is $1,640.00\n"+
        "You earned 47 credits\n"+
        "calc end...\n");
    });
});