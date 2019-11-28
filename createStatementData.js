function createStatementData(invoice, plays) {
	const result = {};
	result.customer = invoice.customer;
	result.performances = invoice.performances.map(enrichPerformance);
	result.totalAmount = totalAmount(result);
	result.totalVolumeCredits = totalVolumeCredits(result);
	return result;

	function enrichPerformance(aPerformance) {
		const result = Object.assign({}, aPerformance);
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);
		return result;
	}

	function totalAmount(data) {
		return data.performances.reduce((total, p) => total + p.amount, 0);
		let result = 0;
		for (let perf of data.performances) {//原书上此处为data，运行报错，修改为statementData后运行正常,后面根据需要的变更重新传入参数data后改为data
			result += perf.amount;
		}
		return result;
	}

	function totalVolumeCredits(data) {
		return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
		let result = 0;
		for (let perf of data.performances) {//原书上此处为data，运行报错，修改为statementData后运行正常,后面根据需要的变更重新传入参数data后改为data
			//add volume credits
			result += perf.volumeCredits;
		}
		return result;
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

module.exports = createStatementData;