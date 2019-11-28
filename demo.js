var createStatementData = require("./createStatementData.js");

let players = {
	"hamlet": { "name": "hamlet", "type": "tradedy" },
	"aslike": { "name": "As you like it", "type": "comedy" },
	"otherllo": { "name": "otherllo", "type": "tradedy" }
};

let invoices = [
	{
		"customer": "BigCo",
		"performances": [
			{ "playId": "hamlet", "audience": 55 },
			{ "playId": "aslike", "audience": 35 },
			{ "playId": "otherllo", "audience": 40 }
		]
	}
];

function statement(invoice, plays) {
	return renderPlainText(createStatementData(invoice, plays));
}

function usd(aNumber) {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
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



function calc() {
	let result = "calc start...\n";
	for (let invoice of invoices) {
		result += statement(invoice, players);
	}
	result += "calc end...\n";
	return result;
}

//再强调一次，是需求的变化使重构变得必要。
//calc();

module.exports = calc;
console.log(module.exports)
// exports.calc = calc;
// console.log(exports)