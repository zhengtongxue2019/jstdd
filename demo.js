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
	const statementData = {};
	statementData.customer = invoice.customer;
	statementData.performances = invoice.performances;
	return renderPlainText(statementData, plays);

	function renderPlainText(data, plays) {
		let result = `Statement for ${data.customer}\n`;
		for (let perf of data.performances) {
			//print line for this order
			result += `\t${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
		}
		result += `Amount owed is ${usd(totalAmount())}\n`;
		result += `You earned ${totalVolumeCredits()} credits\n`;
		return result;
	}

	function totalAmount() {
		let result = 0;
		for (let perf of invoice.performances) {
			result += amountFor(perf);
		}
		return result;
	}

	function totalVolumeCredits() {
		let result = 0;
		for (let perf of invoice.performances) {
			//add volume credits
			result += volumeCreditsFor(perf);
		}
		return result;
	}

	function usd(aNumber) {
		return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100);
	}

	function volumeCreditsFor(aPerformance) {
		let result = 0;
		result += Math.max(aPerformance.audience - 30, 0);
		//add extra credit for every ten comedy attendees
		if ("comedy" == playFor(aPerformance).type)
			result += Math.floor(aPerformance.audience / 5);
		return result;
	}

	function playFor(aPerformance) {
		return plays[aPerformance.playId];
	}

	function amountFor(aPerformance) {
		let result = 0;
		switch (playFor(aPerformance).type) {
			case "tradedy":
				result = 40000;
				if (aPerformance.audience > 30) {
					result += 1000 * (aPerformance.audience - 30);
				}
				break;
			case "comedy":
				result = 30000;
				if (aPerformance.audience > 20) {
					result += 1000 + 500 * (aPerformance.audience - 20);
				}
				result += 300 * aPerformance.audience;
				break;
			default:
				throw new Error(`unknown type: ${playFor(aPerformance).type}`);
		}
		return result;
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