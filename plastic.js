function Plastic(cardNumber){
	var self = this,
		cc = {
			visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
			master: /^5[1-5][0-9]{14}$/,
			diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
			amex: /^3[47][0-9]{13}$/,
			discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
			jcb: /^(?:2131|1800|35\d{3})\d{11}$ /
	}

	self.number = function () {
		return cardNumber.replace(/[^0-9]+/g, '');
	}

	self.isLuhnMatch = function() {
		var luhnArr = [[0, 2, 4, 6, 8, 1, 3, 5, 7, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
			sum = 0;
		self.number().replace(/[\d]/g, function (c, p, o) {
			sum += luhnArr[(o.length - p) & 1][parseInt(c, 10)];
		});
		return (sum % 10 === 0) && (sum > 0);
	}

	self.type = function() {
		for (card in cc) {
			if ( cc[card].test(self.number()) ){
				return card;
			}
		}
	}

	self.isValid = function() {
		return self.isLuhnMatch() && !!self.type();
	}
}