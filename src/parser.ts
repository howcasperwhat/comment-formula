export interface CapturedInfo {
  formula: string
  start: number
  end: number
}
// 1: isStart=0 | isEscape=0 | isComment=0
// 2: isStart=1 | isEscape=0 | isComment=0
// 3: isStart=1 | isEscape=1 | isComment=0
// 4: isStart=1 | isEscape=0 | isComment=1
export function captureInline(content: string, start: number): CapturedInfo[] {
  const results: CapturedInfo[] = []
  const current: string[] = []
  let state: 1 | 2 | 3 | 4 = 1
  // We assume `\n`(LF) and `\r`(CR) are line breaks
  // `\r\n`(CRLF) is regarded as two separate line breaks
  // but it is not a problem since we don't care about the content outside scopes
  for (let i = 0; i < content.length; i++) {
    const char = content[i]
    if (state === 1) {
      if (char === '$') {
        state = 2
      }
      else {
        state = 1
      }
    }
    else if (state === 2) {
      if (char === '\n' || char === '\r') {
        current.length = 0
        state = 1
      }
      else if (char === '$') {
        current.length && results.push({
          formula: current.join(''),
          start: i - current.length + start,
          end: i + start,
        })
        current.length = 0
        state = 1
      }
      else if (char === '\\') {
        current.push(char)
        state = 3
      }
      else if (char === '%') {
        current.push(char)
        state = 4
      }
      else {
        current.push(char)
        state = 2
      }
    }
    else if (state === 3) {
      if (char === '\n' || char === '\r') {
        current.length = 0
        state = 1
      }
      else {
        current.push(char)
        state = 2
      }
    }
    else if (state === 4) {
      if (char === '\n' || char === '\r') {
        current.length = 0
        state = 1
      }
      else if (char === '$') {
        current.length && results.push({
          formula: current.join(''),
          start: i - current.length + start,
          end: i + start,
        })
        current.length = 0
        state = 1
      }
      else {
        current.push(char)
        state = 4
      }
    }
  }
  return results
}

// 1: isStart=0 | isEscape=0 | isComment=0 | isReady=0
// 2: isStart=0 | isEscape=0 | isComment=0 | isReady=1
// 3: isStart=1 | isEscape=0 | isComment=0 | isReady=0
// 4: isStart=1 | isEscape=0 | isComment=0 | isReady=1
// 5: isStart=1 | isEscape=1 | isComment=0 | isReady=0
// 6: isStart=1 | isEscape=0 | isComment=1 | isReady=0
export function captureBlock(content: string, start: number): CapturedInfo[] {
  const results: CapturedInfo[] = []
  const current: string[] = []
  let state: 1 | 2 | 3 | 4 | 5 | 6 = 1
  for (let i = 0; i < content.length; i++) {
    const char = content[i]
    if (state === 1) {
      if (char === '$') {
        state = 2
      }
      else {
        state = 1
      }
    }
    else if (state === 2) {
      if (char === '$') {
        state = 3
      }
      else {
        state = 1
      }
    }
    else if (state === 3) {
      if (char === '$') {
        state = 4
      }
      else if (char === '\\') {
        current.push(char)
        state = 5
      }
      else if (char === '%') {
        current.push(char)
        state = 6
      }
      else {
        current.push(char)
        state = 3
      }
    }
    else if (state === 4) {
      if (char === '$') {
        results.push({
          formula: current.join(''),
          start: i - 1 - current.length + start,
          end: i - 1 + start,
        })
        current.length = 0
        state = 1
      }
      else {
        current.push('$')
        current.push(char)
        state = 3
      }
    }
    else if (state === 5) {
      current.push(char)
      state = 3
    }
    else if (state === 6) {
      if (char === '\n' || char === '\r') {
        current.push(char)
        state = 3
      }
      else {
        current.push(char)
        state = 6
      }
    }
  }
  return results
}
