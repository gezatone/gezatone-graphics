const glob = require('glob')
const cheerio = require('cheerio')
const { parse } = require('path')
const { readFile, writeFile } = require('fs')

glob('build/icons/*.svg', (err, paths) => {
	paths.forEach(path => {
		readFile(path, (err, data) => {
			const $ = cheerio.load(data)
			const svg = $('svg')
			const width = svg.attr('width')
			const height = svg.attr('height')
			const { name } = parse(path)

			svg
				.attr(
					'viewBox',
					`0 0 ${width} ${height}`
				)
				.attr('id', `icon--${name}`)
				.attr('class', `icon icon--${name}`)
				.removeAttr('width')
				.removeAttr('height')
				.removeAttr('xmlns')
			$('path').removeAttr('fill')

			writeFile(path, $.html(), () => {
				console.log(`Done ${path}`)
			})
		})
	})
})
