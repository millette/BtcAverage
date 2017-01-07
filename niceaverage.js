'use strict'

const mean = require('lodash/fp/mean')
const meanBy = require('lodash/fp/meanBy')

const riance = (s) => {
  const m = mean(s)
  const m3 = (n) => Math.pow(n - m, 2)
  return meanBy(m3)(s)
}

const sriance = (s) => {
  const n = s.length
  return riance(s) * n / (n - 1)
}

const stdev = (s) => Math.sqrt(riance(s))

const sstdev = (s) => Math.sqrt(sriance(s))

const SPREAD = 1

const nmean = (s) => {
  const et = stdev(s) * SPREAD
  const m = mean(s)
  const s2 = s.filter((n) => Math.abs(n - m) < et)
  return {
    average: mean(s2),
    dataset: s2
  }
}

const snmean = (s) => {
  const et = sstdev(s) * SPREAD
  const m = mean(s)
  const s2 = s.filter((n) => Math.abs(n - m) < et)
  return {
    average: mean(s2),
    dataset: s2
  }
}

module.exports = snmean

module.exports.snmean = nmean
