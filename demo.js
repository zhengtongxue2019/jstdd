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
	statementData.performances = invoice.performances.map(enrichPerformance);
	statementData.totalAmount = totalAmount(statementData);
	statementData.totalVolumeCredits = totalVolumeCredits(statementData);
	return renderPlainText(statementData, plays);

	function enrichPerformance(aPerformance){
		const result = Object.assign({}, aPerformance);
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);
		return result;
	}

	function renderPlainText(data, plays) {
		let result = `Statement for ${data.customer}\n`;
		for (let perf of data.performances) {
			//print line for this order
			result += `\t${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
		}
		result += `Amount owed is ${usd(data.totalAmount)}\n`;
		result += `You earned ${data.totalVolumeCredits} credits\n`;
		return result;
	}

	function totalAmount(data) {
		return data.performances.reduce((total, p)=> total+p.amount, 0);
		let result = 0;
		for (let perf of data.performances) {//原书上此处为data，运行报错，修改为statementData后运行正常,后面根据需要的变更重新传入参数data后改为data
			result += perf.amount;
		}
		return result;
	}

	function totalVolumeCredits(data) {
		let result = 0;
		for (let perf of data.performances) {//原书上此处为data，运行报错，修改为statementData后运行正常,后面根据需要的变更重新传入参数data后改为data
			//add volume credits
			result += perf.volumeCredits;
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
		if ("comedy" == aPerformance.play.type)
			result += Math.floor(aPerformance.audience / 5);
		return result;
	}

	function playFor(aPerformance) {
		return plays[aPerformance.playId];
	}

	function amountFor(aPerformance) {
		let result = 0;
		switch (aPerformance.play.type) {
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
				throw new Error(`unknown type: ${aPerformance.play.type}`);
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