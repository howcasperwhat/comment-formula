import type { LiteElement } from 'mathjax-full/js/adaptors/lite/Element'
import { Buffer } from 'node:buffer'
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html'
import { TeX } from 'mathjax-full/js/input/tex'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages'
import { mathjax } from 'mathjax-full/js/mathjax'
import { SVG } from 'mathjax-full/js/output/svg'
import { computed } from 'reactive-vscode'
import { config, isLarge } from './config'

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
      width = Number.parseFloat(code.match(/width="(\d*(?:\.\d*)?)ex"/)![1])
      height = Number.parseFloat(code.match(/height="(\d*(?:\.\d*)?)ex"/)![1])
    }
    else {
      const elem = this.document!.convert(tex)
      const svg: LiteElement = elem.children[0]
      width = Number.parseFloat(svg.attributes.width)
      height = Number.parseFloat(svg.attributes.height)
      code = this.adaptor!.innerHTML(elem)
    }
    return new FormulaPreview(width, height, code, color)
  }
}

export const transformer = new Transformer()
