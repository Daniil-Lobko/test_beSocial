const axios = require('axios');
const cheerio = require('cheerio');

const parse = async () => {
  // @ts-ignore
  const getHTML = async (url) => {
    const {data} = await axios.get(url)
    return cheerio.load(data)
  };

  let selector = await getHTML('https://bank.gov.ua/ua/markets/exchangerates');
  // @ts-ignore
  let currencies = []
  // @ts-ignore
  let currency;
  // @ts-ignore
  let value;
  let j = 0;
  // @ts-ignore
  selector('td').each((i, element) => {
    if(selector(element).text().match(/\b[A-Z]+\b/u)){
      currency = selector(element).text()
      console.log(currency)
    }
    if(selector(element).text().match(/^[-+]?[0-9]*[.,][0-9]+(?:[eE][-+]?[0-9]+)?$/u)){
      value = selector(element).text()
      console.log(value)
    }
    j++
    // @ts-ignore
    if (typeof value !== 'undefined' && typeof currency !== 'undefined'){
      if (j == 5){
        // @ts-ignore
        currencies.push({currency, value})
        j=0;
      }
    }

  })
  // @ts-ignore
  console.log(currencies)

};

module.exports = parse