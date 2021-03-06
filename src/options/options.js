(function () {
	var defaultVals = {
	  'currency': 'USD',
	  'crypto_currency': 'bitcoin',
	  'symbol': '$',
	  'symbol_prefix': true,
	  'theme': 'dark'
	};
  
	var config = {};
  
	var Options = {
	  init() {
		this.resetConfigVars();
		this.setTheme();
		this.initializeContent();
		this.registerListeners();
	  },
  
	  initializeContent() {
		this.fillListRequest();
		$('#user_currency').val(config.currency);
		$('#crypto_currency').val(config.crypto_currency);
		$('#user_theme').val(config.theme);
  
	  },
  
	  registerListeners() {
		var self = this;
		$('#btnSaveOptions').on('click', () => {
		  $(this).find('#user_currency').val();
		  $(this).find('#crypto_currency').val();
		  localStorage['currency'] = $('#user_currency').val();
		  localStorage['crypto_currency'] = $('#crypto_currency').val();
		  localStorage['theme'] = $('#user_theme').val();
		  self.resetConfigVars();
		});
	  },
  
	  fillListRequest() {
		var request = new XMLHttpRequest();
		if (request == null) {
		  console.error('Unable to create request!');
		} else {
		  request.onreadystatechange = () => {
			if (request.readyState == 4) {
			  Options.handleResponse(request.responseText);
			}
		  }
  
		  const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=50';
  
		  request.open('GET', url, true);
		  request.send(null);
		}
	  },
  
	  handleResponse(response) {
		if (response.length == 0) {
		  console.log('Something went wrong!')
		} else {
		  var results = JSON.parse(response);
  
		  $.each(results, (i, item) => {
			// Add a delimiter at the top 5 crypto currencies
			if (i == 5) {
			  $('#crypto_currency').append($('<option>', {
				disabled: true,
				text: '---'
			  }));
			} else {
			  $('#crypto_currency').append($('<option>', {
				value: item.id,
				text: item.name
			  }));
			}
		  });
		  
		  // Set the values that the user has chosen previously
		  $('#crypto_currency').val(config.crypto_currency);
		  $('#user_currency').val(config.currency);
		  $('#user_theme').val(config.theme);
		}
	  },
  
	  resetConfigVars() {
		for (var key in defaultVals) {
		  config[key] = localStorage[key] || defaultVals[key];
		}
	  },
	  setTheme() {
		if (config.theme == 'light') {
		  document.getElementById('light').rel = 'stylesheet';
		  document.getElementById('dark').rel = 'alternate stylesheet';
		} else {
		  document.getElementById('light').rel = 'alternate stylesheet';
		  document.getElementById('dark').rel = 'stylesheet';
		}
	  }
	};
  
	return Options;
  })().init();
  