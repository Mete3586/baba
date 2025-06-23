module.exports = {
  id: 'novelaozora',
  name: 'NovelAozora',
  version: '1.0.0',
  icon: '',
  language: ['tr'],
  site: 'https://novelaozora.com',
  routes: [
    {
      path: '/seri/:slug/',
      method: 'GET',
      handler: async ({ slug }) => {
        const page = await request.get(`https://novelaozora.com/seri/${slug}/`)
        const $ = cheerio.load(page)

        const chapters = []
        $('.chapters li a').each((i, el) => {
          chapters.push({
            name: $(el).text().trim(),
            url: $(el).attr('href'),
          })
        })

        return {
          name: slug.replace(/-/g, ' '),
          chapters,
        }
      },
    },
    {
      path: '/:chapterUrl',
      method: 'GET',
      handler: async ({ chapterUrl }) => {
        const page = await request.get(`https://novelaozora.com/${chapterUrl}`)
        const $ = cheerio.load(page)

        const content = $('.text-left').html()
        return {
          content,
        }
      },
    },
  ],
}
