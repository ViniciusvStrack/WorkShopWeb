import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const readProjectFile = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8')

describe('production metadata', () => {
  it('describes the Portuguese workshop for search and sharing', () => {
    const html = readProjectFile('index.html')

    expect(html).toContain('lang="pt-BR"')
    expect(html).toMatch(/<meta name="description" content=".+"/)
    expect(html).toContain('<link rel="canonical"')
    expect(html).toContain('property="og:title"')
    expect(html).toContain('property="og:description"')
    expect(html).toContain('property="og:image"')
    expect(html).toContain('name="theme-color"')
    expect(html).toContain('rel="icon"')
  })
})

describe('Netlify configuration', () => {
  it('builds dist with explicit cache and security headers', () => {
    const config = readProjectFile('netlify.toml')

    expect(config).toContain('command = "npm run build"')
    expect(config).toContain('publish = "dist"')
    expect(config).toContain('for = "/assets/*"')
    expect(config).toContain('public, max-age=31536000, immutable')
    expect(config).toContain('for = "/index.html"')
    expect(config).toContain('public, max-age=0, must-revalidate')
    expect(config).toContain('X-Content-Type-Options')
    expect(config).toContain('Referrer-Policy')
    expect(config).toContain('Permissions-Policy')
  })
})
