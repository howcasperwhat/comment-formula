import type { ComputedRef, Ref } from 'reactive-vscode'
import type { StatusBarItem } from 'vscode'
import { computed, ref, useDisposable, watch } from 'reactive-vscode'
import { ThemeColor, window } from 'vscode'
import * as Meta from './generated/meta'
import { config } from './store/shared'
import { debounce } from './utils'

interface Record {
  times: number[]
  index: number
  count: number
}

export class Performance {
  private static readonly WINDOW_SIZE = 10

  private records: Ref<Record>
  private perf: ComputedRef<number>
  private status: StatusBarItem

  public constructor(private name: string, immediate = true) {
    this.records = ref({
      times: Array.from({ length: Performance.WINDOW_SIZE }, () => 0),
      index: 0,
      count: 0,
    })

    this.perf = computed(() => {
      const sum = this.records.value.times.reduce((a, b) => a + b, 0)
      const cnt = this.records.value.count
      return cnt > 0 ? sum / cnt : 0
    })

    this.status = useDisposable(window.createStatusBarItem(
      `${Meta.name}.perf.${this.name}`,
    ))
    this.status.tooltip = Meta.name

    immediate && this.start()
  }

  public tick(time: number) {
    const record = this.records.value
    record.times[record.index] = time
    record.index = (record.index + 1) % record.times.length
    record.count = Math.min(record.count + 1, record.times.length)
  }

  public get performance(): number {
    return this.perf.value
  }

  public start() {
    const update = () => {
      this.status.text = `$(clock) ${this.perf.value.toFixed(2)}ms`
      this.status.color = new ThemeColor(this.perf.value > 100
        ? this.perf.value > 300
          ? 'editorError.foreground'
          : 'editorWarning.foreground'
        : 'editorInfo.foreground')

      config.extension.inspect && this.status.show()
    }
    const trigger = debounce(update, 1000)

    watch(this.perf, trigger, { immediate: true })
    watch(
      () => config.extension.inspect,
      () => {
        config.extension.inspect
          ? this.status.show()
          : this.status.hide()
      },
    )
  }
}
