/**
 * Build responsive image sets for the marketing site.
 *
 * Source files live in /assets-source/photos (not served). Output goes to
 * apps/web/public/images/optimized as AVIF + WebP + JPEG at several widths.
 *
 * Usage: node scripts/optimize-images.mjs
 */
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SOURCE = path.resolve("assets-source/photos")
const OUT = path.resolve("public/images/optimized")
const WIDTHS = [480, 800, 1200, 1600]
const QUALITY = { avif: 52, webp: 74, jpeg: 78 }

await mkdir(OUT, { recursive: true })

const files = (await readdir(SOURCE)).filter(f => /\.(jpe?g|png)$/i.test(f))

for (const file of files) {
  const base = path.basename(file, path.extname(file))
  const input = path.join(SOURCE, file)
  const image = sharp(input).rotate()
  const meta = await image.metadata()
  const maxWidth = meta.width ?? 1600

  for (const width of WIDTHS.filter(w => w <= Math.max(maxWidth, 480))) {
    for (const format of ['avif', 'webp', 'jpeg']) {
      const pipeline = sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
      const output = path.join(OUT, `${base}-${width}.${format === 'jpeg' ? 'jpg' : format}`)
      await pipeline.toFormat(format === 'jpeg' ? 'jpeg' : format, { quality: QUALITY[format], progressive: format === 'jpeg' }).toFile(output)
    }
  }
  console.log(`✓ ${base}`)
}

const total = (await readdir(OUT)).length
console.log(`\n${files.length} photos → ${total} optimized files in ${path.relative(process.cwd(), OUT)}`)
