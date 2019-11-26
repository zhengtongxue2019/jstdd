let players = {
	"hamlet":{"name":"hamlet","type":"tradedy"},
	"aslike":{"name":"As you like it","type":"comedy"},
	"otherllo":{"name":"otherllo","type":"tradedy"}
};

let invoices = [
	{
		"customer":"BigCo",
		"performances":[
			{"playId":"hamlet", "audience": 55},
			{"playId":"aslike", "audience": 35},
			{"playId":"otherllo", "audience": 40}
		]
	}
];

function statement(invoice, plays){
	let totalAmount = 0;
	let volumeCredits = 0;
	for (let perf of invoice.performances){					
		//add volume credits
		volumeCredits += Math.max(perf.audience - 30, 0);
		//add extra credit for every ten comedy attendees
		if("comedy" == playFor(perf).type) 
			volumeCredits+=Math.floor(perf.audience/5);
	}

	let result = `Statement for ${invoice.customer}\n`;
	const format = new Intl.NumberFormat("en-US", {style:"currency", currency:"USD", minimumFractionDigits:2}).format;
	for (let perf of invoice.performances){					
			//print line for this order
			result += `\t${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
			totalAmount += amountFor(perf);
	}
	
	result += `Amount owed is ${format(totalAmount/100)}\n`;
	result += `You earned ${volumeCredits} credits\n`;
	return result;

	function playFor(aPerformance) {
		return plays[aPerformance.playId];
	}

	function amountFor(aPerformance) {
		let thisAmount = 0;
		switch (playFor(aPerformance).type) {
			case "tradedy":
				thisAmount = 40000;
				if (aPerformance.audience > 30) {
					thisAmount += 1000 * (aPerformance.audience - 30);
				}
				break;
			case "comedy":
				thisAmount = 30000;
				if (aPerformance.audience > 20) {
					thisAmount += 1000 + 500 * (aPerformance.audience - 20);
				}
				thisAmount += 300 * aPerformance.audience;
				break;
			default:
				throw new Error(`unknown type: ${playFor(aPerformance).type}`);
		}
		return thisAmount;
	}
}

function calc(){
	let result = "calc start...\n";
	for (let invoice of invoices){
		result += statement(invoice, players); 
	}
	result +="calc end...\n";
	return result;
}

//再强调一次，是需求的变化使重构变得必要。
//calc();

module.exports = calc;
console.log(module.exports)
// exports.calc = calc;
// console.log(exports)