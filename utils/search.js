const serp = require('./serp')

async function getSearch (query) {
  var options = {
    host: 'google.com',
    ignore: ['youtube.com', 'twitter.com', 'facebook.com'],
    qs: {
      q: `"${query}"`,
      nfpr: 1, // exclusion of results from an auto-corrected query: 1 for disabled
      filter: 0,
      pws: 0
    },
    num: 3
  }

  try {
    const result = await serp.search(options)
    return result
  } catch (e) {
    console.log(e)
  }
}

module.exports = getSearch
