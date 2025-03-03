/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * THIS FILE IS MODIFIED FROM https://github.com/yzhang-gh/vscode-markdown/blob/master/src/util/katex-funcs.ts
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MIT License
 * 
 * Copyright (c) 2017 张宇
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Modified by Casper Huang on 2025:
 * - Merge functions with the same number of arguments.
 * - Remove `'@ifstar', '@ifnextchar', '@firstoftwo', '@secondoftwo'` 
 *   in FUNC0.macros.
 * - Add bbox and encolse.
 * - Migrate cancel in `annotation` to `cancel` in `FUNC2` and add `cancelto`.
 * - Add mhchem in `FUNC2`.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
**/

//
// Suffixes explained:
// \cmd         -> 0
// \cmd{$1}     -> 1
// \cmd{$1}{$2} -> 2
//
// Use linebreak to mimic the structure of the KaTeX [Support Table](https://katex.org/docs/supported.html)
// source https://github.com/KaTeX/KaTeX/blob/main/docs/supported.md
//
export const FUNC0 = {
  verticalLayout: ['atop'],
  fractions: ['over', 'above'],
  binomialCoefficients: ['choose'],
  font: ['rm', 'bf', 'it', 'sf', 'tt'],
  debugging: ['message', 'errmessage', 'show'],
  style: ['displaystyle', 'textstyle', 'scriptstyle', 'scriptscriptstyle', 'limits', 'nolimits', 'verb'],
  size: ['Huge', 'huge', 'LARGE', 'Large', 'large', 'normalsize', 'small', 'footnotesize', 'scriptsize', 'tiny'],
  delimiters: [
    'lparen', 'rparen', 'lceil', 'rceil', 'uparrow', 'lbrack', 'rbrack', 'lfloor', 'rfloor',
    'downarrow', 'lbrace', 'rbrace', 'lmoustache', 'rmoustache', 'updownarrow', 'langle',
    'rangle', 'lgroup', 'rgroup', 'Uparrow', 'vert', 'ulcorner', 'urcorner', 'Downarrow',
    'Vert', 'llcorner', 'lrcorner', 'Updownarrow', 'lvert', 'rvert', 'lVert', 'rVert',
    'backslash', 'lang', 'rang', 'lt', 'gt', 'llbracket', 'rrbracket', 'lBrace', 'rBrace'
  ],
  delimeterSizing: [
    'left', 'big', 'bigl', 'bigm', 'bigr', 'middle', 'Big', 'Bigl', 'Bigm', 'Bigr',
    'right', 'bigg', 'biggl', 'biggm', 'biggr', 'Bigg', 'Biggl', 'Biggm', 'Biggr'
  ],
  greekLetters: [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
    'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi',
    'Chi', 'Psi', 'Omega', 'varGamma', 'varDelta', 'varTheta', 'varLambda', 'varXi', 'varPi',
    'varSigma', 'varUpsilon', 'varPhi', 'varPsi', 'varOmega', 'alpha', 'beta', 'gamma', 'delta',
    'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron',
    'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'varepsilon',
    'varkappa', 'vartheta', 'thetasym', 'varpi', 'varrho', 'varsigma', 'varphi', 'digamma'
  ],
  otherLetters: [
    'imath', 'nabla', 'Im', 'Reals', 'jmath', 'partial', 'image', 'wp', 'aleph', 'Game',
    'Bbbk', 'weierp', 'alef', 'Finv', 'N', 'Z', 'alefsym', 'cnums', 'natnums', 'beth',
    'Complex', 'R', 'gimel', 'ell', 'Re', 'daleth', 'hbar', 'real', 'eth', 'hslash', 'reals'
  ],
  spacing: [
    'thinspace', 'medspace', 'thickspace', 'enspace', 'quad', 'qquad', 'negthinspace',
    'negmedspace', 'nobreakspace', 'negthickspace', 'space', 'mathstrut'
  ],
  logicAndSetTheory: [
    'forall', 'complement', 'therefore', 'emptyset', 'exists', 'subset', 'because', 'empty', 'exist',
    'supset', 'mapsto', 'varnothing', 'nexists', 'mid', 'to', 'implies', 'in', 'land', 'gets',
    'impliedby', 'isin', 'lor', 'leftrightarrow', 'iff', 'notin', 'ni', 'notni', 'neg', 'lnot'
  ],
  macros: [
    'def', 'gdef', 'edef', 'xdef', 'let', 'futurelet', 'global', 'newcommand', 'renewcommand',
    'providecommand', 'long', 'char', 'mathchoice', 'TextOrMath', 'relax', 'expandafter', 'noexpand'
  ],
  bigOperators: [
    'sum', 'prod', 'bigotimes', 'bigvee', 'int', 'coprod', 'bigoplus', 'bigwedge', 'iint', 'intop',
    'bigodot', 'bigcap', 'iiint', 'smallint', 'biguplus', 'bigcup', 'oint', 'oiint', 'oiiint', 'bigsqcup'
  ],
  binaryOperators: [
    'cdot', 'gtrdot', 'pmod', 'cdotp', 'intercal', 'pod', 'centerdot', 'land', 'rhd', 'circ',
    'leftthreetimes', 'rightthreetimes', 'amalg', 'circledast', 'ldotp', 'rtimes', 'And',
    'circledcirc', 'lor', 'setminus', 'ast', 'circleddash', 'lessdot', 'smallsetminus',
    'barwedge', 'Cup', 'lhd', 'sqcap', 'bigcirc', 'cup', 'ltimes', 'sqcup', 'bmod', 'curlyvee',
    'times', 'boxdot', 'curlywedge', 'mp', 'unlhd', 'boxminus', 'div', 'odot', 'unrhd', 'boxplus',
    'divideontimes', 'ominus', 'uplus', 'boxtimes', 'dotplus', 'oplus', 'vee', 'bullet',
    'doublebarwedge', 'otimes', 'veebar', 'Cap', 'doublecap', 'oslash', 'wedge', 'cap', 'doublecup',
    'pm', 'plusmn', 'wr'
  ],
  mathOperators: [
    'arcsin', 'cosec', 'deg', 'sec', 'arccos', 'cosh', 'dim', 'sin', 'arctan', 'cot',
    'exp', 'sinh', 'arctg', 'cotg', 'hom', 'sh', 'arcctg', 'coth', 'ker', 'tan', 'arg',
    'csc', 'lg', 'tanh', 'ch', 'ctg', 'ln', 'tg', 'cos', 'cth', 'log', 'th', 'argmax',
    'injlim', 'min', 'varinjlim', 'argmin', 'lim', 'plim', 'varliminf', 'det', 'liminf',
    'Pr', 'varlimsup', 'gcd', 'limsup', 'projlim', 'varprojlim', 'inf', 'max', 'sup'
  ],
  relations: [
    'doteqdot', 'lessapprox', 'smile', 'eqcirc', 'lesseqgtr', 'sqsubset', 'eqcolon', 'minuscolon',
    'lesseqqgtr', 'sqsubseteq', 'Eqcolon', 'minuscoloncolon', 'lessgtr', 'sqsupset', 'approx',
    'eqqcolon', 'equalscolon', 'lesssim', 'sqsupseteq', 'approxcolon', 'Eqqcolon', 'equalscoloncolon',
    'll', 'Subset', 'approxcoloncolon', 'eqsim', 'lll', 'subset', 'sub', 'approxeq', 'eqslantgtr',
    'llless', 'subseteq', 'sube', 'asymp', 'eqslantless', 'lt', 'subseteqq', 'backepsilon', 'equiv',
    'mid', 'succ', 'backsim', 'fallingdotseq', 'models', 'succapprox', 'backsimeq', 'frown', 'multimap',
    'succcurlyeq', 'between', 'ge', 'origof', 'succeq', 'bowtie', 'geq', 'owns', 'succsim', 'bumpeq',
    'geqq', 'parallel', 'Supset', 'Bumpeq', 'geqslant', 'perp', 'supset', 'circeq', 'gg', 'pitchfork',
    'supseteq', 'supe', 'colonapprox', 'ggg', 'prec', 'supseteqq', 'Colonapprox', 'coloncolonapprox',
    'gggtr', 'precapprox', 'thickapprox', 'coloneq', 'colonminus', 'gt', 'preccurlyeq', 'thicksim',
    'Coloneq', 'coloncolonminus', 'gtrapprox', 'preceq', 'trianglelefteq', 'coloneqq', 'colonequals',
    'gtreqless', 'precsim', 'triangleq', 'Coloneqq', 'coloncolonequals', 'gtreqqless', 'propto', 
    'trianglerighteq', 'colonsim', 'gtrless', 'risingdotseq', 'varpropto', 'Colonsim', 'coloncolonsim',
    'gtrsim', 'shortmid', 'vartriangle', 'cong', 'imageof', 'shortparallel', 'vartriangleleft',
    'curlyeqprec', 'in', 'isin', 'sim', 'vartriangleright', 'curlyeqsucc', 'Join', 'simcolon',
    'vcentcolon', 'ratio', 'dashv', 'le', 'simcoloncolon', 'vdash', 'dblcolon', 'coloncolon', 'leq',
    'simeq', 'vDash', 'doteq', 'leqq', 'smallfrown', 'Vdash', 'Doteq', 'leqslant', 'smallsmile', 'Vvdash',
  ],
  negatedRelations: [
    'gnapprox', 'ngeqslant', 'nsubseteq', 'precneqq', 'gneq', 'ngtr', 'nsubseteqq', 'precnsim', 'gneqq',
    'nleq', 'nsucc', 'subsetneq', 'gnsim', 'nleqq', 'nsucceq', 'subsetneqq', 'gvertneqq', 'nleqslant',
    'nsupseteq', 'succnapprox', 'lnapprox', 'nless', 'nsupseteqq', 'succneqq', 'lneq', 'nmid', 'ntriangleleft',
    'succnsim', 'lneqq', 'notin', 'ntrianglelefteq', 'supsetneq', 'lnsim', 'notni', 'ntriangleright',
    'supsetneqq', 'lvertneqq', 'nparallel', 'ntrianglerighteq', 'varsubsetneq', 'ncong', 'nprec', 'nvdash',
    'varsubsetneqq', 'ne', 'npreceq', 'nvDash', 'varsupsetneq', 'neq', 'nshortmid', 'nVDash', 'varsupsetneqq',
    'ngeq', 'nshortparallel', 'nVdash', 'ngeqq', 'nsim', 'precnapprox'
  ],
  arrows: [
    'circlearrowleft', 'leftharpoonup', 'rArr', 'circlearrowright', 'leftleftarrows', 'rarr', 'curvearrowleft',
    'leftrightarrow', 'restriction', 'curvearrowright', 'Leftrightarrow', 'rightarrow', 'Darr', 'leftrightarrows',
    'Rightarrow', 'dArr', 'leftrightharpoons', 'rightarrowtail', 'darr', 'leftrightsquigarrow', 'rightharpoondown',
    'dashleftarrow', 'Lleftarrow', 'rightharpoonup', 'dashrightarrow', 'longleftarrow', 'rightleftarrows',
    'downarrow', 'Longleftarrow', 'rightleftharpoons', 'Downarrow', 'longleftrightarrow', 'rightrightarrows',
    'downdownarrows', 'Longleftrightarrow', 'rightsquigarrow', 'downharpoonleft', 'longmapsto', 'Rrightarrow',
    'downharpoonright', 'longrightarrow', 'Rsh', 'gets', 'Longrightarrow', 'searrow', 'Harr', 'looparrowleft',
    'swarrow', 'hArr', 'looparrowright', 'to', 'harr', 'Lrarr', 'twoheadleftarrow', 'hookleftarrow', 'lrArr',
    'twoheadrightarrow', 'hookrightarrow', 'lrarr', 'Uarr', 'iff', 'Lsh', 'uArr', 'impliedby', 'mapsto', 'uarr',
    'implies', 'nearrow', 'uparrow', 'Larr', 'nleftarrow', 'Uparrow', 'lArr', 'nLeftarrow', 'updownarrow', 'larr',
    'nleftrightarrow', 'Updownarrow', 'leadsto', 'nLeftrightarrow', 'upharpoonleft', 'leftarrow', 'nrightarrow',
    'upharpoonright', 'Leftarrow', 'nRightarrow', 'upuparrows', 'leftarrowtail', 'nwarrow', 'leftharpoondown', 'Rarr'
  ],
  symbolsAndPunctuation: [
    'cdots', 'LaTeX', 'ddots', 'TeX', 'ldots', 'nabla', 'vdots', 'infty', 'dotsb', 'infin', 'dotsc', 'checkmark',
    'dotsi', 'dag', 'dotsm', 'dagger', 'dotso', 'sdot', 'ddag', 'mathellipsis', 'ddagger', 'Box', 'Dagger', 'lq',
    'square', 'angle', 'blacksquare', 'measuredangle', 'rq', 'triangle', 'sphericalangle', 'triangledown', 'top',
    'triangleleft', 'bot', 'triangleright', 'colon', 'bigtriangledown', 'backprime', 'bigtriangleup', 'pounds',
    'prime', 'blacktriangle', 'mathsterling', 'blacktriangledown', 'blacktriangleleft', 'yen', 'blacktriangleright',
    'surd', 'diamond', 'degree', 'Diamond', 'lozenge', 'mho', 'blacklozenge', 'diagdown', 'star', 'diagup', 'bigstar',
    'flat', 'clubsuit', 'natural', 'copyright', 'clubs', 'sharp', 'circledR', 'diamondsuit', 'heartsuit', 'diamonds',
    'hearts', 'circledS', 'spadesuit', 'spades', 'maltese', 'minuso'
  ],
  upgreek: [
    'Updelta', 'Upgamma', 'Uplambda', 'Upomega', 'Upphi', 'Uppi', 'Uppsi', 'Upsigma', 'Uptheta', 'Upupsilon',
    'Upxi', 'upalpha', 'upbeta', 'upchi', 'updelta', 'upepsilon', 'upeta', 'upgamma', 'upiota', 'upkappa',
    'uplambda', 'upmu', 'upnu', 'upomega', 'upphi', 'uppi', 'uppsi', 'uprho', 'upsigma', 'uptau', 'uptheta',
    'upupsilon', 'upvarepsilon', 'upvarphi', 'upvarpi', 'upvarrho', 'upvarsigma', 'upvartheta', 'upxi', 'upzeta'
  ]
}
export const FUNC1 = {
  sqrt: ['sqrt'],
  verticalLayout: ['substack'],
  logicAndSetTheory: ['Set', 'set'],
  braketNotation: ['bra', 'Bra', 'ket', 'Ket', 'braket', 'Braket'],
  mathOperators: ['operatorname', 'operatorname*', 'operatornamewithlimits'],
  overlap: ['mathllap', 'mathrlap', 'mathclap', 'llap', 'rlap', 'clap', 'smash'],
  spacing: ['kern', 'mkern', 'mskip', 'hskip', 'hspace', 'hspace*', 'phantom', 'hphantom', 'vphantom'],
  classAssignment: ['mathbin', 'mathclose', 'mathinner', 'mathop', 'mathopen', 'mathord', 'mathpunct', 'mathrel'],
  annotation: ['overbrace', 'underbrace', 'not =', 'sout', 'boxed', 'phase', 'tag', 'tag*'],
  accents: [
    'tilde', 'mathring', 'widetilde', 'overgroup', 'utilde', 'undergroup', 'acute', 'vec', 'Overrightarrow', 'bar',
    'overleftarrow', 'overrightarrow', 'breve', 'underleftarrow', 'underrightarrow', 'check', 'overleftharpoon',
    'overrightharpoon', 'dot', 'overleftrightarrow', 'overbrace', 'ddot', 'underleftrightarrow', 'underbrace',
    'grave', 'overline', 'overlinesegment', 'hat', 'underline', 'underlinesegment', 'widehat', 'widecheck', 'underbar'
  ],
  extensibleArrows: [
    'xleftarrow', 'xrightarrow', 'xLeftarrow', 'xRightarrow', 'xleftrightarrow', 'xLeftrightarrow',
    'xhookleftarrow', 'xhookrightarrow', 'xtwoheadleftarrow', 'xtwoheadrightarrow', 'xleftharpoonup',
    'xrightharpoonup', 'xleftharpoondown', 'xrightharpoondown', 'xleftrightharpoons', 'xrightleftharpoons',
    'xtofrom', 'xmapsto', 'xlongequal'
  ],
  font: [
    'mathrm', 'mathbf', 'mathit', 'mathnormal', 'textbf', 'textit', 'textrm', 'bold', 'Bbb', 'textnormal', 'boldsymbol',
    'mathbb', 'text', 'bm', 'frak', 'mathsf', 'mathtt', 'mathfrak', 'textsf', 'texttt', 'mathcal', 'mathscr', 'pmb'
  ],
  cancel: ['cancel', 'bcancel', 'xcancel', 'cancelto'],
  mhchem: ['ce']
}
export const FUNC2 = {
  color: ['color', 'textcolor', 'colorbox'],
  fractions: ['frac', 'dfrac', 'tfrac', 'cfrac', 'genfrac'],
  verticalLayout: ['stackrel', 'overset', 'underset', 'raisebox'],
  binomialCoefficients: ['binom', 'dbinom', 'tbinom', 'brace', 'brack']
}
export const ENVS = [
  'equation*', 'eqnarray*', 'align', 'align*', 'multline', 'multline*', 'split', 'gather', 'gather*',
  'alignat', 'alignat*', 'alignedat', 'aligned', 'gathered', 'xalignat', 'xalignat*', 'xxalignat', 'flalign',
  'flalign*', 'subarray', 'smallmatrix', 'matrix', 'pmatrix', 'bmatrix', 'Bmatrix', 'vmatrix', 'Vmatrix',
  'cases', 'CD', 'array', 'equation', 'eqnarray', 'prooftree', 'numcases', 'subnumcases', 'empheq',
  'dcases', 'rcases', 'drcases', 'dcases*', 'rcases*', 'drcases*', 'cases*', 'matrix*', 'pmatrix*',
  'bmatrix*', 'Bmatrix*', 'vmatrix*', 'Vmatrix*', 'smallmatrix*', 'psmallmatrix', 'lgathered', 'rgathered',
  'psmallmatrix*', 'bsmallmatrix', 'bsmallmatrix*', 'Bsmallmatrix', 'Bsmallmatrix*', 'vsmallmatrix',
  'vsmallmatrix*', 'Vsmallmatrix', 'Vsmallmatrix*', 'crampedsubarray', 'multlined', 'spreadlines'
]
export const SPECIAL = [
  { name: 'bbox', format: '[]{}', snippet: '[$1]{$2}' },
  { name: 'bbox', format: '[]', snippet: '[$1]' },
  { name: 'enclose', format: '{}[]{}', snippet: '{$1}[$2]{$3}' },
  { name: 'enclose', format: '{}{}', snippet: '{$1}{$2}' }
]