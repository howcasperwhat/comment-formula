import { mathjax } from "mathjax-full/js/mathjax"
import { TeX } from "mathjax-full/js/input/tex"
import { SVG } from "mathjax-full/js/output/svg"
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor"
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html"
import { LiteElement } from "mathjax-full/js/adaptors/lite/Element"
import { config, isLarge } from './config'
import { computed } from "reactive-vscode"
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages'

interface URLAttributes {
  large: boolean
  error: boolean
  url: string
}

interface SVGAtrributes {
  width: number
  height: number
  code: string
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
            name => !mmlPackages.includes(name)
          )
        }),
        OutputJax: new SVG({
          fontCache: 'local'
        })
      })
    }
  }
  public async tex2svg(content: string): Promise<SVGAtrributes> {
    let width: number, height: number, code: string
    if (this.useAPI.value) {
      const data = await fetch([
        config.extension.api.prefix,
        encodeURIComponent(content),
        config.extension.api.suffix
      ].join(''))
      code = await data.text()
      width = parseFloat(code.match(/width="(\d*\.?\d*)ex"/)![1])
      height = parseFloat(code.match(/height="(\d*\.?\d*)ex"/)![1])
    } else {
      const elem = this.document!.convert(content)
      const svg: LiteElement = elem.children[0]
      width = parseFloat(svg.attributes.width)
      height = parseFloat(svg.attributes.height)
      code = this.adaptor!.innerHTML(elem)
    }
    return { width, height, code }
  }
  public async svg2url(content: string, color?: string): Promise<URLAttributes> {
    const svg = await this.tex2svg(content)
    const colored = color ? svg.code.replaceAll('currentColor', color) : svg.code
    return {
      large: isLarge(svg.height),
      error: colored.includes('data-mjx-error'),
      url: `data:image/svg+xml;base64,${Buffer.from(colored).toString('base64')}`
    }
  }
}

export const transformer = new Transformer()
