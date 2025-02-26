import type { LiteElement } from 'mathjax-full/js/adaptors/lite/Element'
import { Buffer } from 'node:buffer'
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html'
import { TeX } from 'mathjax-full/js/input/tex'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages'
import { mathjax } from 'mathjax-full/js/mathjax'
import { SVG } from 'mathjax-full/js/output/svg'
import { computed } from 'reactive-vscode'
import { config, exToPx, isLarge, store } from './config'

export class FormulaPreview {
  public readonly width: number
  public readonly height: number
  public readonly code: string
  public readonly error: boolean
  public readonly large: boolean
  public readonly inline: boolean
  public readonly url: string
  public constructor(width: number, height: number, code: string, color?: string) {
    this.width = width
    this.height = height
    this.code = color ? code.replaceAll('currentColor', color) : code
    this.error = code.includes('data-mjx-error')
    this.large = isLarge(height)
    this.inline = !this.large && !this.error
    this.url = `data:image/svg+xml;base64,${Buffer.from(this.code).toString('base64')}`
  }
}

class Transformer {
  private adaptor
  private document
  private useAPI
  public constructor() {
    this.useAPI = computed(() => config.extension.api.prefix !== '')
    const mmlPackages = ['action']
    if (!this.useAPI.value) {
      this.adaptor = liteAdaptor()
      RegisterHTMLHandler(this.adaptor)
      this.document = mathjax.document('', {
        InputJax: new TeX({
          packages: AllPackages.filter(
            name => !mmlPackages.includes(name),
          ),
        }),
        OutputJax: new SVG({
          fontCache: 'local',
        }),
      })
    }
  }

  public async from(tex: string, color?: string): Promise<FormulaPreview> {
    let width: number, height: number, code: string
    if (this.useAPI.value) {
      const data = await fetch([
        config.extension.api.prefix,
        encodeURIComponent(tex),
        config.extension.api.suffix,
      ].join(''))
      code = await data.text()
      width = Number.parseFloat(
        code.match(/width="(\d*(?:\.\d*)?)ex"/)![1],
      ) * store.scale.value
      height = Number.parseFloat(
        code.match(/height="(\d*(?:\.\d*)?)ex"/)![1],
      ) * store.scale.value
      code = code.replace(
        /(?<=width=")(\d*(?:\.\d*)?)(?=ex")/,
        `${width}`,
      ).replace(
        /(?<=height=")(\d*(?:\.\d*)?)(?=ex")/,
        `${height}`,
      )
    }
    else {
      const elem = this.document!.convert(tex)
      const svg: LiteElement = elem.children[0]
      width = exToPx(Number.parseFloat(svg.attributes.width) * store.scale.value)
      height = exToPx(Number.parseFloat(svg.attributes.height) * store.scale.value)
      this.adaptor!.setAttribute(svg, 'width', `${width}px`)
      this.adaptor!.setAttribute(svg, 'height', `${height}px`)
      code = this.adaptor!.innerHTML(elem)
    }
    return new FormulaPreview(width, height, code, color)
  }
}

export const transformer = new Transformer()
