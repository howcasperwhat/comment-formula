/**
 * Names are generated from 
 * [MathJax](https://github.com/mathjax/MathJax-src/blob/master/ts/input/tex/)
 * < Apache-2.0 License >
 * 
 * Formats and snippets are collected and sorted by 
 * [Casper Huang](https://github.com/howcasperwhat)
 * < MIT License >
 */

interface Completion {
  name: string
  format?: string
  snippet?: string
}
export const CHARACTERS: string[] = [
  "dotplus",
  "ltimes",
  "smallsetminus",
  "rtimes",
  "Cap",
  "doublecap",
  "leftthreetimes",
  "Cup",
  "doublecup",
  "rightthreetimes",
  "barwedge",
  "curlywedge",
  "veebar",
  "curlyvee",
  "doublebarwedge",
  "boxminus",
  "circleddash",
  "boxtimes",
  "circledast",
  "boxdot",
  "circledcirc",
  "boxplus",
  "centerdot",
  "divideontimes",
  "intercal",
  "leqq",
  "geqq",
  "leqslant",
  "geqslant",
  "eqslantless",
  "eqslantgtr",
  "lesssim",
  "gtrsim",
  "lessapprox",
  "gtrapprox",
  "approxeq",
  "lessdot",
  "gtrdot",
  "lll",
  "llless",
  "ggg",
  "gggtr",
  "lessgtr",
  "gtrless",
  "lesseqgtr",
  "gtreqless",
  "lesseqqgtr",
  "gtreqqless",
  "doteqdot",
  "Doteq",
  "eqcirc",
  "risingdotseq",
  "circeq",
  "fallingdotseq",
  "triangleq",
  "backsim",
  "thicksim",
  "backsimeq",
  "thickapprox",
  "subseteqq",
  "supseteqq",
  "Subset",
  "Supset",
  "sqsubset",
  "sqsupset",
  "preccurlyeq",
  "succcurlyeq",
  "curlyeqprec",
  "curlyeqsucc",
  "precsim",
  "succsim",
  "precapprox",
  "succapprox",
  "vartriangleleft",
  "lhd",
  "vartriangleright",
  "rhd",
  "trianglelefteq",
  "unlhd",
  "trianglerighteq",
  "unrhd",
  "vDash",
  "Vdash",
  "Vvdash",
  "smallsmile",
  "shortmid",
  "smallfrown",
  "shortparallel",
  "bumpeq",
  "between",
  "Bumpeq",
  "pitchfork",
  "varpropto",
  "backepsilon",
  "blacktriangleleft",
  "blacktriangleright",
  "therefore",
  "because",
  "eqsim",
  "vartriangle",
  "Join",
  "nless",
  "ngtr",
  "nleq",
  "ngeq",
  "nleqslant",
  "ngeqslant",
  "nleqq",
  "ngeqq",
  "lneq",
  "gneq",
  "lneqq",
  "gneqq",
  "lvertneqq",
  "gvertneqq",
  "lnsim",
  "gnsim",
  "lnapprox",
  "gnapprox",
  "nprec",
  "nsucc",
  "npreceq",
  "nsucceq",
  "precneqq",
  "succneqq",
  "precnsim",
  "succnsim",
  "precnapprox",
  "succnapprox",
  "nsim",
  "ncong",
  "nshortmid",
  "nshortparallel",
  "nmid",
  "nparallel",
  "nvdash",
  "nvDash",
  "nVdash",
  "nVDash",
  "ntriangleleft",
  "ntriangleright",
  "ntrianglelefteq",
  "ntrianglerighteq",
  "nsubseteq",
  "nsupseteq",
  "nsubseteqq",
  "nsupseteqq",
  "subsetneq",
  "supsetneq",
  "varsubsetneq",
  "varsupsetneq",
  "subsetneqq",
  "supsetneqq",
  "varsubsetneqq",
  "varsupsetneqq",
  "leftleftarrows",
  "rightrightarrows",
  "leftrightarrows",
  "rightleftarrows",
  "Lleftarrow",
  "Rrightarrow",
  "twoheadleftarrow",
  "twoheadrightarrow",
  "leftarrowtail",
  "rightarrowtail",
  "looparrowleft",
  "looparrowright",
  "leftrightharpoons",
  "rightleftharpoons",
  "curvearrowleft",
  "curvearrowright",
  "circlearrowleft",
  "circlearrowright",
  "Lsh",
  "Rsh",
  "upuparrows",
  "downdownarrows",
  "upharpoonleft",
  "upharpoonright",
  "downharpoonleft",
  "restriction",
  "multimap",
  "downharpoonright",
  "leftrightsquigarrow",
  "rightsquigarrow",
  "leadsto",
  "dashrightarrow",
  "dashleftarrow",
  "nleftarrow",
  "nrightarrow",
  "nLeftarrow",
  "nRightarrow",
  "nleftrightarrow",
  "nLeftrightarrow",
  "digamma",
  "varkappa",
  "varGamma",
  "varDelta",
  "varTheta",
  "varLambda",
  "varXi",
  "varPi",
  "varSigma",
  "varUpsilon",
  "varPhi",
  "varPsi",
  "varOmega",
  "beth",
  "gimel",
  "daleth",
  "backprime",
  "hslash",
  "varnothing",
  "blacktriangle",
  "triangledown",
  "blacktriangledown",
  "square",
  "Box",
  "blacksquare",
  "lozenge",
  "Diamond",
  "blacklozenge",
  "circledS",
  "bigstar",
  "sphericalangle",
  "measuredangle",
  "nexists",
  "complement",
  "mho",
  "eth",
  "Finv",
  "diagup",
  "Game",
  "diagdown",
  "Bbbk",
  "yen",
  "circledR",
  "checkmark",
  "maltese",
  "alpha",
  "beta",
  "gamma",
  "delta",
  "epsilon",
  "zeta",
  "eta",
  "theta",
  "iota",
  "kappa",
  "lambda",
  "mu",
  "nu",
  "xi",
  "omicron",
  "pi",
  "rho",
  "sigma",
  "tau",
  "upsilon",
  "phi",
  "chi",
  "psi",
  "omega",
  "varepsilon",
  "vartheta",
  "varpi",
  "varrho",
  "varsigma",
  "varphi",
  "S",
  "aleph",
  "hbar",
  "imath",
  "jmath",
  "ell",
  "wp",
  "Re",
  "Im",
  "partial",
  "infty",
  "prime",
  "emptyset",
  "nabla",
  "top",
  "bot",
  "angle",
  "triangle",
  "backslash",
  "forall",
  "exists",
  "neg",
  "lnot",
  "flat",
  "natural",
  "sharp",
  "clubsuit",
  "diamondsuit",
  "heartsuit",
  "spadesuit",
  "surd",
  "coprod",
  "bigvee",
  "bigwedge",
  "biguplus",
  "bigcap",
  "bigcup",
  "int",
  "intop",
  "iint",
  "iiint",
  "prod",
  "sum",
  "bigotimes",
  "bigoplus",
  "bigodot",
  "oint",
  "bigsqcup",
  "smallint",
  "triangleleft",
  "triangleright",
  "bigtriangleup",
  "bigtriangledown",
  "wedge",
  "land",
  "vee",
  "lor",
  "cap",
  "cup",
  "ddagger",
  "dagger",
  "sqcap",
  "sqcup",
  "uplus",
  "amalg",
  "diamond",
  "bullet",
  "wr",
  "div",
  "divsymbol",
  "odot",
  "oslash",
  "otimes",
  "ominus",
  "oplus",
  "mp",
  "pm",
  "circ",
  "bigcirc",
  "setminus",
  "cdot",
  "ast",
  "times",
  "star",
  "propto",
  "sqsubseteq",
  "sqsupseteq",
  "parallel",
  "mid",
  "dashv",
  "vdash",
  "leq",
  "le",
  "geq",
  "ge",
  "lt",
  "gt",
  "succ",
  "prec",
  "approx",
  "succeq",
  "preceq",
  "supset",
  "subset",
  "supseteq",
  "subseteq",
  "in",
  "ni",
  "notin",
  "owns",
  "gg",
  "ll",
  "sim",
  "simeq",
  "perp",
  "equiv",
  "asymp",
  "smile",
  "frown",
  "ne",
  "neq",
  "cong",
  "doteq",
  "bowtie",
  "models",
  "notChar",
  "Leftrightarrow",
  "Leftarrow",
  "Rightarrow",
  "leftrightarrow",
  "leftarrow",
  "gets",
  "rightarrow",
  "to",
  "mapsto",
  "leftharpoonup",
  "leftharpoondown",
  "rightharpoonup",
  "rightharpoondown",
  "nearrow",
  "searrow",
  "nwarrow",
  "swarrow",
  "rightleftharpoons",
  "hookrightarrow",
  "hookleftarrow",
  "longleftarrow",
  "Longleftarrow",
  "longrightarrow",
  "Longrightarrow",
  "Longleftrightarrow",
  "longleftrightarrow",
  "longmapsto",
  "ldots",
  "cdots",
  "vdots",
  "ddots",
  "dotsc",
  "dotsb",
  "dotsm",
  "dotsi",
  "dotso",
  "ldotp",
  "cdotp",
  "colon",
  "Gamma",
  "Delta",
  "Theta",
  "Lambda",
  "Xi",
  "Pi",
  "Sigma",
  "Upsilon",
  "Phi",
  "Psi",
  "Omega",
  "And",
  "ohm",
  "degree",
  "celsius",
  "perthousand",
  "micro",
  "dotproduct",
  "vdot",
  "crossproduct",
  "cross",
  "cp",
  "gradientnabla",
  "real",
  "imaginary",
  "upalpha",
  "upbeta",
  "upgamma",
  "updelta",
  "upepsilon",
  "upzeta",
  "upeta",
  "uptheta",
  "upiota",
  "upkappa",
  "uplambda",
  "upmu",
  "upnu",
  "upxi",
  "upomicron",
  "uppi",
  "uprho",
  "upsigma",
  "uptau",
  "upupsilon",
  "upphi",
  "upchi",
  "uppsi",
  "upomega",
  "upvarepsilon",
  "upvartheta",
  "upvarpi",
  "upvarrho",
  "upvarsigma",
  "upvarphi",
  "Upgamma",
  "Updelta",
  "Uptheta",
  "Uplambda",
  "Upxi",
  "Uppi",
  "Upsigma",
  "Upupsilon",
  "Upphi",
  "Uppsi",
  "Upomega"
]
export const COMMANDS: Completion[] = [
  {
    "name": "mathring",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "nobreakspace"
  },
  {
    "name": "negmedspace"
  },
  {
    "name": "negthickspace"
  },
  {
    "name": "idotsint"
  },
  {
    "name": "dddot",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "ddddot",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "sideset",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "boxed",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "tag"
  },
  {
    "name": "notag"
  },
  {
    "name": "eqref",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "substack",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "injlim"
  },
  {
    "name": "projlim"
  },
  {
    "name": "varliminf"
  },
  {
    "name": "varlimsup"
  },
  {
    "name": "varinjlim"
  },
  {
    "name": "varprojlim"
  },
  {
    "name": "DeclareMathOperator",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "operatorname",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "genfrac",
    "format": "{}{}{}{}{}{}",
    "snippet": "{$1}{$2}{$3}{$4}{$5}{$6}"
  },
  {
    "name": "frac",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "tfrac",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "dfrac",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "binom",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "tbinom",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "dbinom",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "cfrac",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "shoveleft",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "shoveright",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xrightarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xleftarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "minCDarrowwidth",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "minCDarrowheight",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "displaystyle"
  },
  {
    "name": "textstyle"
  },
  {
    "name": "scriptstyle"
  },
  {
    "name": "scriptscriptstyle"
  },
  {
    "name": "rm"
  },
  {
    "name": "mit"
  },
  {
    "name": "oldstyle"
  },
  {
    "name": "cal"
  },
  {
    "name": "it"
  },
  {
    "name": "bf"
  },
  {
    "name": "bbFont"
  },
  {
    "name": "scr"
  },
  {
    "name": "frak"
  },
  {
    "name": "sf"
  },
  {
    "name": "tt"
  },
  {
    "name": "mathrm",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathnormal",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbfup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbfit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbb",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Bbb",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathfrak",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbffrak",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathscr",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbfscr",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathsf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathsfup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbfsf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbfsfup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathsfit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbfsfit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathtt",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathcal",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbfcal",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symrm",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symnormal",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbfup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbfit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbb",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symfrak",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbffrak",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symscr",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbfscr",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symsf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symsfup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbfsf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbfsfup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symsfit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbfsfit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symtt",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symcal",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "symbfcal",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textrm",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textup",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textnormal",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textbf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textsf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "texttt",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "tiny"
  },
  {
    "name": "Tiny"
  },
  {
    "name": "scriptsize"
  },
  {
    "name": "small"
  },
  {
    "name": "normalsize"
  },
  {
    "name": "large"
  },
  {
    "name": "Large"
  },
  {
    "name": "LARGE"
  },
  {
    "name": "huge"
  },
  {
    "name": "Huge"
  },
  {
    "name": "arcsin"
  },
  {
    "name": "arccos"
  },
  {
    "name": "arctan"
  },
  {
    "name": "arg"
  },
  {
    "name": "cos"
  },
  {
    "name": "cosh"
  },
  {
    "name": "cot"
  },
  {
    "name": "coth"
  },
  {
    "name": "csc"
  },
  {
    "name": "deg"
  },
  {
    "name": "det"
  },
  {
    "name": "dim"
  },
  {
    "name": "exp"
  },
  {
    "name": "gcd"
  },
  {
    "name": "hom"
  },
  {
    "name": "inf"
  },
  {
    "name": "ker"
  },
  {
    "name": "lg"
  },
  {
    "name": "lim"
  },
  {
    "name": "liminf"
  },
  {
    "name": "limsup"
  },
  {
    "name": "ln"
  },
  {
    "name": "log"
  },
  {
    "name": "max"
  },
  {
    "name": "min"
  },
  {
    "name": "Pr"
  },
  {
    "name": "sec"
  },
  {
    "name": "sin"
  },
  {
    "name": "sinh"
  },
  {
    "name": "sup"
  },
  {
    "name": "tan"
  },
  {
    "name": "tanh"
  },
  {
    "name": "limits"
  },
  {
    "name": "nolimits"
  },
  {
    "name": "overline"
  },
  {
    "name": "underline"
  },
  {
    "name": "overbrace",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "underbrace",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "overparen",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "underparen",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "overrightarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "underrightarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "overleftarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "underleftarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "overleftrightarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "underleftrightarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "overset",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "underset",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "overunderset",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "stackrel",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "stackbin",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "over"
  },
  {
    "name": "overwithdelims"
  },
  {
    "name": "atop"
  },
  {
    "name": "atopwithdelims"
  },
  {
    "name": "above"
  },
  {
    "name": "abovewithdelims"
  },
  {
    "name": "brace"
  },
  {
    "name": "brack"
  },
  {
    "name": "choose"
  },
  {
    "name": "frac",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "sqrt",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "sqrt",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "root",
    "format": "{}of{}",
    "snippet": "{$1}\\of{$2}"
  },
  {
    "name": "uproot",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "leftroot",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "left"
  },
  {
    "name": "right"
  },
  {
    "name": "middle"
  },
  {
    "name": "llap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "rlap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "raise",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "lower",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "moveleft",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "moveright",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "enspace"
  },
  {
    "name": "quad"
  },
  {
    "name": "qquad"
  },
  {
    "name": "thinspace"
  },
  {
    "name": "negthinspace"
  },
  {
    "name": "hskip",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "hspace",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "kern",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mskip",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mspace",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mkern",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "rule",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "Rule",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "Space",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "nonscript"
  },
  {
    "name": "big"
  },
  {
    "name": "Big"
  },
  {
    "name": "bigg"
  },
  {
    "name": "Bigg"
  },
  {
    "name": "bigl"
  },
  {
    "name": "Bigl"
  },
  {
    "name": "biggl"
  },
  {
    "name": "Biggl"
  },
  {
    "name": "bigr"
  },
  {
    "name": "Bigr"
  },
  {
    "name": "biggr"
  },
  {
    "name": "Biggr"
  },
  {
    "name": "bigm"
  },
  {
    "name": "Bigm"
  },
  {
    "name": "biggm"
  },
  {
    "name": "Biggm"
  },
  {
    "name": "mathord",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathop",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathopen",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathclose",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathbin",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathrel",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathpunct",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathinner",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vcenter",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "buildrel",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "hbox",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "text",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mbox",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "fbox",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "boxed",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "framebox",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "framebox",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "framebox",
    "format": "[][]{}",
    "snippet": "[$1][$2]{$3}"
  },
  {
    "name": "strut"
  },
  {
    "name": "mathstrut"
  },
  {
    "name": "phantom",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vphantom",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "hphantom",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "smash",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "acute",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "grave",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "ddot",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "tilde",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "bar",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "breve",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "check",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "hat",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vec",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "dot",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "widetilde",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "widehat",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "matrix",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "array",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "pmatrix",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "cases",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "eqalign",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "displaylines",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "cr"
  },
  {
    "name": "newline"
  },
  {
    "name": "hline"
  },
  {
    "name": "hdashline"
  },
  {
    "name": "eqalignno"
  },
  {
    "name": "leqalignno"
  },
  {
    "name": "hfill"
  },
  {
    "name": "hfil"
  },
  {
    "name": "hfilll"
  },
  {
    "name": "bmod"
  },
  {
    "name": "pmod",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mod",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "pod",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "iff"
  },
  {
    "name": "skew",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "pmb",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "TeX"
  },
  {
    "name": "LaTeX"
  },
  {
    "name": "not"
  },
  {
    "name": "dots"
  },
  {
    "name": "space"
  },
  {
    "name": "begin",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "end",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "label",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "ref",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "nonumber"
  },
  {
    "name": "mathchoice",
    "format": "{}{}{}{}",
    "snippet": "{$1}{$2}{$3}{$4}"
  },
  {
    "name": "mmlToken",
    "format": "{}[]{}",
    "snippet": "{$1}[$2]{$3}"
  },
  {
    "name": "mmlToken",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "bbox",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "boldsymbol",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "bra",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "ket",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "braket",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "set",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Bra",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Ket",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Braket",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Set",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "ketbra",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Ketbra",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "AxiomC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "UnaryInfC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "BinaryInfC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "TrinaryInfC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "QuaternaryInfC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "QuinaryInfC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "RightLabel",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "LeftLabel",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "AXC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "UIC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "BIC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "TIC",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "RL",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "LL",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "noLine"
  },
  {
    "name": "singleLine"
  },
  {
    "name": "solidLine"
  },
  {
    "name": "dashedLine"
  },
  {
    "name": "alwaysNoLine"
  },
  {
    "name": "alwaysSingleLine"
  },
  {
    "name": "alwaysSolidLine"
  },
  {
    "name": "alwaysDashedLine"
  },
  {
    "name": "rootAtTop"
  },
  {
    "name": "alwaysRootAtTop"
  },
  {
    "name": "rootAtBottom"
  },
  {
    "name": "alwaysRootAtBottom"
  },
  {
    "name": "fCenter"
  },
  {
    "name": "Axiom",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "UnaryInf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "BinaryInf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "TrinaryInf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "QuaternaryInf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "QuinaryInf",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "cancel",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "bcancel",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xcancel",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "cancelto",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "centerOver",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "centernot",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "color",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textcolor",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "definecolor",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "colorbox",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "fcolorbox",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "cellcolor",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "rowcolor",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "columncolor",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "color",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "empheqlbrace"
  },
  {
    "name": "empheqrbrace"
  },
  {
    "name": "empheqlbrack"
  },
  {
    "name": "empheqrbrack"
  },
  {
    "name": "empheqlangle"
  },
  {
    "name": "empheqrangle"
  },
  {
    "name": "empheqlparen"
  },
  {
    "name": "empheqrparen"
  },
  {
    "name": "empheqlvert"
  },
  {
    "name": "empheqrvert"
  },
  {
    "name": "empheqlVert"
  },
  {
    "name": "empheqrVert"
  },
  {
    "name": "empheqlfloor"
  },
  {
    "name": "empheqrfloor"
  },
  {
    "name": "empheqlceil"
  },
  {
    "name": "empheqrceil"
  },
  {
    "name": "empheqbiglbrace"
  },
  {
    "name": "empheqbigrbrace"
  },
  {
    "name": "empheqbiglbrack"
  },
  {
    "name": "empheqbigrbrack"
  },
  {
    "name": "empheqbiglangle"
  },
  {
    "name": "empheqbigrangle"
  },
  {
    "name": "empheqbiglparen"
  },
  {
    "name": "empheqbigrparen"
  },
  {
    "name": "empheqbiglvert"
  },
  {
    "name": "empheqbigrvert"
  },
  {
    "name": "empheqbiglVert"
  },
  {
    "name": "empheqbigrVert"
  },
  {
    "name": "empheqbiglfloor"
  },
  {
    "name": "empheqbigrfloor"
  },
  {
    "name": "empheqbiglceil"
  },
  {
    "name": "empheqbigrceil"
  },
  {
    "name": "empheql"
  },
  {
    "name": "empheqr"
  },
  {
    "name": "empheqbigl"
  },
  {
    "name": "empheqbigr"
  },
  {
    "name": "enclose",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "xtwoheadrightarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xtwoheadleftarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xmapsto",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xlongequal",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xtofrom",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Newextarrow",
    "format": "{}{,}{}",
    "snippet": "{$1}{$2,$3}{$4}"
  },
  {
    "name": "href",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "class",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "style",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "cssId",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "shoveleft",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "shoveright",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xleftrightarrow",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xLeftarrow",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xRightarrow",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xLeftrightarrow",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xhookleftarrow",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xhookrightarrow",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xmapsto",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xrightharpoondown",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xleftharpoondown",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xrightleftharpoons",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xrightharpoonup",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xleftharpoonup",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "xleftrightharpoons",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "mathllap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathrlap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathclap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "clap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textllap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textrlap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textclap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "cramped",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "crampedllap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "crampedrlap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "crampedclap",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "crampedsubstack",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathmbox",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mathmakebox",
    "format": "[]{}",
    "snippet": "[$1]{$2}"
  },
  {
    "name": "overbracket",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "underbracket",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "refeq",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "MoveEqLeft"
  },
  {
    "name": "Aboxed",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "ArrowBetweenLines"
  },
  {
    "name": "vdotswithin",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "shortvdotswithin",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "MTFlushSpaceAbove"
  },
  {
    "name": "MTFlushSpaceBelow"
  },
  {
    "name": "DeclarePairedDelimiter",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "DeclarePairedDelimiterX",
    "format": "{}[]{}{}{}",
    "snippet": "{$1}[$2]{$3}{$4}{$5}"
  },
  {
    "name": "DeclarePairedDelimiterXPP",
    "format": "{}[]{}{}{}{}{}",
    "snippet": "{$1}[$2]{$3}{$4}{$5}{$6}{$7}"
  },
  {
    "name": "DeclarePairedDelimiters",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "DeclarePairedDelimitersX",
    "format": "{}[]{}{}{}",
    "snippet": "{$1}[$2]{$3}{$4}{$5}"
  },
  {
    "name": "DeclarePairedDelimitersXPP",
    "format": "{}[]{}{}{}{}{}",
    "snippet": "{$1}[$2]{$3}{$4}{$5}{$6}{$7}"
  },
  {
    "name": "centercolon"
  },
  {
    "name": "ordinarycolon"
  },
  {
    "name": "MTThinColon"
  },
  {
    "name": "coloneqq"
  },
  {
    "name": "Coloneqq"
  },
  {
    "name": "coloneq"
  },
  {
    "name": "Coloneq"
  },
  {
    "name": "eqqcolon"
  },
  {
    "name": "Eqqcolon"
  },
  {
    "name": "eqcolon"
  },
  {
    "name": "Eqcolon"
  },
  {
    "name": "colonapprox"
  },
  {
    "name": "Colonapprox"
  },
  {
    "name": "colonsim"
  },
  {
    "name": "Colonsim"
  },
  {
    "name": "dblcolon"
  },
  {
    "name": "nuparrow"
  },
  {
    "name": "ndownarrow"
  },
  {
    "name": "bigtimes"
  },
  {
    "name": "splitfrac",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "splitdfrac",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "xmathstrut"
  },
  {
    "name": "prescript",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "newtagform",
    "format": "{}[]{}{}",
    "snippet": "{$1}[$2]{$3}{$4}"
  },
  {
    "name": "renewtagform",
    "format": "{}[]{}{}",
    "snippet": "{$1}[$2]{$3}{$4}"
  },
  {
    "name": "usetagform",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "adjustlimits"
  },
  {
    "name": "mathtoolsset",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "ce",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "pu",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "longrightleftharpoons"
  },
  {
    "name": "longRightleftharpoons"
  },
  {
    "name": "longLeftrightharpoons"
  },
  {
    "name": "longleftrightarrows"
  },
  {
    "name": "tripledash"
  },
  {
    "name": "xleftrightarrow"
  },
  {
    "name": "xrightleftharpoons"
  },
  {
    "name": "xRightleftharpoons"
  },
  {
    "name": "xLeftrightharpoons"
  },
  {
    "name": "newcommand",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "renewcommand",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "newenvironment",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "renewenvironment",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "def",
    "format": "?{}",
    "snippet": "$1{$2}"
  },
  {
    "name": "let",
    "format": "?=?",
    "snippet": "$1=$2"
  },
  {
    "name": "quantity"
  },
  {
    "name": "qty"
  },
  {
    "name": "pqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "bqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Bqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "absolutevalue"
  },
  {
    "name": "abs"
  },
  {
    "name": "norm"
  },
  {
    "name": "evaluated"
  },
  {
    "name": "eval"
  },
  {
    "name": "order",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "commutator",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "comm",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "anticommutator",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "acomm",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "poissonbracket",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "pb",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "vnabla"
  },
  {
    "name": "vectorbold",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vb",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vectorarrow",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "va",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vectorunit",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vu",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "gradient"
  },
  {
    "name": "grad"
  },
  {
    "name": "divergence"
  },
  {
    "name": "div"
  },
  {
    "name": "curl"
  },
  {
    "name": "laplacian"
  },
  {
    "name": "sin"
  },
  {
    "name": "sinh"
  },
  {
    "name": "arcsin"
  },
  {
    "name": "asin"
  },
  {
    "name": "cos"
  },
  {
    "name": "cosh"
  },
  {
    "name": "arccos"
  },
  {
    "name": "acos"
  },
  {
    "name": "tan"
  },
  {
    "name": "tanh"
  },
  {
    "name": "arctan"
  },
  {
    "name": "atan"
  },
  {
    "name": "csc"
  },
  {
    "name": "csch"
  },
  {
    "name": "arccsc"
  },
  {
    "name": "acsc"
  },
  {
    "name": "sec"
  },
  {
    "name": "sech"
  },
  {
    "name": "arcsec"
  },
  {
    "name": "asec"
  },
  {
    "name": "cot"
  },
  {
    "name": "coth"
  },
  {
    "name": "arccot"
  },
  {
    "name": "acot"
  },
  {
    "name": "exp"
  },
  {
    "name": "log"
  },
  {
    "name": "ln"
  },
  {
    "name": "det"
  },
  {
    "name": "Pr"
  },
  {
    "name": "tr"
  },
  {
    "name": "trace"
  },
  {
    "name": "Tr"
  },
  {
    "name": "Trace"
  },
  {
    "name": "rank"
  },
  {
    "name": "erf"
  },
  {
    "name": "Residue"
  },
  {
    "name": "Res"
  },
  {
    "name": "principalvalue"
  },
  {
    "name": "pv"
  },
  {
    "name": "PV"
  },
  {
    "name": "Re"
  },
  {
    "name": "Im"
  },
  {
    "name": "sine"
  },
  {
    "name": "hypsine"
  },
  {
    "name": "arcsine"
  },
  {
    "name": "asine"
  },
  {
    "name": "cosine"
  },
  {
    "name": "hypcosine"
  },
  {
    "name": "arccosine"
  },
  {
    "name": "acosine"
  },
  {
    "name": "tangent"
  },
  {
    "name": "hyptangent"
  },
  {
    "name": "arctangent"
  },
  {
    "name": "atangent"
  },
  {
    "name": "cosecant"
  },
  {
    "name": "hypcosecant"
  },
  {
    "name": "arccosecant"
  },
  {
    "name": "acosecant"
  },
  {
    "name": "secant"
  },
  {
    "name": "hypsecant"
  },
  {
    "name": "arcsecant"
  },
  {
    "name": "asecant"
  },
  {
    "name": "cotangent"
  },
  {
    "name": "hypcotangent"
  },
  {
    "name": "arccotangent"
  },
  {
    "name": "acotangent"
  },
  {
    "name": "exponential"
  },
  {
    "name": "logarithm"
  },
  {
    "name": "naturallogarithm"
  },
  {
    "name": "determinant"
  },
  {
    "name": "Probability"
  },
  {
    "name": "qqtext"
  },
  {
    "name": "qq"
  },
  {
    "name": "qcomma"
  },
  {
    "name": "qc"
  },
  {
    "name": "qcc"
  },
  {
    "name": "qif"
  },
  {
    "name": "qthen"
  },
  {
    "name": "qelse"
  },
  {
    "name": "qotherwise"
  },
  {
    "name": "qunless"
  },
  {
    "name": "qgiven"
  },
  {
    "name": "qusing"
  },
  {
    "name": "qassume"
  },
  {
    "name": "qsince"
  },
  {
    "name": "qlet"
  },
  {
    "name": "qfor"
  },
  {
    "name": "qall"
  },
  {
    "name": "qeven"
  },
  {
    "name": "qodd"
  },
  {
    "name": "qinteger"
  },
  {
    "name": "qand"
  },
  {
    "name": "qor"
  },
  {
    "name": "qas"
  },
  {
    "name": "qin"
  },
  {
    "name": "diffd"
  },
  {
    "name": "flatfrac",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "differential"
  },
  {
    "name": "dd"
  },
  {
    "name": "variation"
  },
  {
    "name": "var"
  },
  {
    "name": "derivative",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "dv",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "partialderivative",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "pderivative",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "pdv",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "functionalderivative",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "fderivative",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "fdv",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "bra",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "ket",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "innerproduct",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "ip",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "braket",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "outerproduct",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "dyad",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "ketbra",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "op",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "expectationvalue",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "expval",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "ev",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "matrixelement",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "matrixel",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "mel",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "matrixquantity",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "pmqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "Pmqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "bmqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "vmqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "smallmatrixquantity",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "smqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "spmqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "sPmqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "sbmqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "svmqty",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "matrixdeterminant",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "mdet",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "smdet",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "identitymatrix",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "imat",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "xmatrix",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "xmat",
    "format": "{}{}{}",
    "snippet": "{$1}{$2}{$3}"
  },
  {
    "name": "zeromatrix",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "zmat",
    "format": "{}{}",
    "snippet": "{$1}{$2}"
  },
  {
    "name": "paulimatrix",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "pmat",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "diagonalmatrix",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "dmat",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "antidiagonalmatrix",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "admat",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "textasciicircum"
  },
  {
    "name": "textasciitilde"
  },
  {
    "name": "textasteriskcentered"
  },
  {
    "name": "textbackslash"
  },
  {
    "name": "textbar"
  },
  {
    "name": "textbraceleft"
  },
  {
    "name": "textbraceright"
  },
  {
    "name": "textbullet"
  },
  {
    "name": "textdagger"
  },
  {
    "name": "textdaggerdbl"
  },
  {
    "name": "textellipsis"
  },
  {
    "name": "textemdash"
  },
  {
    "name": "textendash"
  },
  {
    "name": "textexclamdown"
  },
  {
    "name": "textgreater"
  },
  {
    "name": "textless"
  },
  {
    "name": "textordfeminine"
  },
  {
    "name": "textordmasculine"
  },
  {
    "name": "textparagraph"
  },
  {
    "name": "textperiodcentered"
  },
  {
    "name": "textquestiondown"
  },
  {
    "name": "textquotedblleft"
  },
  {
    "name": "textquotedblright"
  },
  {
    "name": "textquoteleft"
  },
  {
    "name": "textquoteright"
  },
  {
    "name": "textsection"
  },
  {
    "name": "textunderscore"
  },
  {
    "name": "textvisiblespace"
  },
  {
    "name": "textacutedbl"
  },
  {
    "name": "textasciiacute"
  },
  {
    "name": "textasciibreve"
  },
  {
    "name": "textasciicaron"
  },
  {
    "name": "textasciidieresis"
  },
  {
    "name": "textasciimacron"
  },
  {
    "name": "textgravedbl"
  },
  {
    "name": "texttildelow"
  },
  {
    "name": "textbaht"
  },
  {
    "name": "textcent"
  },
  {
    "name": "textcolonmonetary"
  },
  {
    "name": "textcurrency"
  },
  {
    "name": "textdollar"
  },
  {
    "name": "textdong"
  },
  {
    "name": "texteuro"
  },
  {
    "name": "textflorin"
  },
  {
    "name": "textguarani"
  },
  {
    "name": "textlira"
  },
  {
    "name": "textnaira"
  },
  {
    "name": "textpeso"
  },
  {
    "name": "textsterling"
  },
  {
    "name": "textwon"
  },
  {
    "name": "textyen"
  },
  {
    "name": "textcircledP"
  },
  {
    "name": "textcompwordmark"
  },
  {
    "name": "textcopyleft"
  },
  {
    "name": "textcopyright"
  },
  {
    "name": "textregistered"
  },
  {
    "name": "textservicemark"
  },
  {
    "name": "texttrademark"
  },
  {
    "name": "textbardbl"
  },
  {
    "name": "textbigcircle"
  },
  {
    "name": "textblank"
  },
  {
    "name": "textbrokenbar"
  },
  {
    "name": "textdiscount"
  },
  {
    "name": "textestimated"
  },
  {
    "name": "textinterrobang"
  },
  {
    "name": "textinterrobangdown"
  },
  {
    "name": "textmusicalnote"
  },
  {
    "name": "textnumero"
  },
  {
    "name": "textopenbullet"
  },
  {
    "name": "textpertenthousand"
  },
  {
    "name": "textperthousand"
  },
  {
    "name": "textrecipe"
  },
  {
    "name": "textreferencemark"
  },
  {
    "name": "textlangle"
  },
  {
    "name": "textrangle"
  },
  {
    "name": "textlbrackdbl"
  },
  {
    "name": "textrbrackdbl"
  },
  {
    "name": "textlquill"
  },
  {
    "name": "textrquill"
  },
  {
    "name": "textcelsius"
  },
  {
    "name": "textdegree"
  },
  {
    "name": "textdiv"
  },
  {
    "name": "textdownarrow"
  },
  {
    "name": "textfractionsolidus"
  },
  {
    "name": "textleftarrow"
  },
  {
    "name": "textlnot"
  },
  {
    "name": "textmho"
  },
  {
    "name": "textminus"
  },
  {
    "name": "textmu"
  },
  {
    "name": "textohm"
  },
  {
    "name": "textonehalf"
  },
  {
    "name": "textonequarter"
  },
  {
    "name": "textonesuperior"
  },
  {
    "name": "textpm"
  },
  {
    "name": "textrightarrow"
  },
  {
    "name": "textsurd"
  },
  {
    "name": "textthreequarters"
  },
  {
    "name": "textthreesuperior"
  },
  {
    "name": "texttimes"
  },
  {
    "name": "texttwosuperior"
  },
  {
    "name": "textuparrow"
  },
  {
    "name": "textborn"
  },
  {
    "name": "textdied"
  },
  {
    "name": "textdivorced"
  },
  {
    "name": "textmarried"
  },
  {
    "name": "textcentoldstyle"
  },
  {
    "name": "textdollaroldstyle"
  },
  {
    "name": "textzerooldstyle"
  },
  {
    "name": "textoneoldstyle"
  },
  {
    "name": "texttwooldstyle"
  },
  {
    "name": "textthreeoldstyle"
  },
  {
    "name": "textfouroldstyle"
  },
  {
    "name": "textfiveoldstyle"
  },
  {
    "name": "textsixoldstyle"
  },
  {
    "name": "textsevenoldstyle"
  },
  {
    "name": "texteightoldstyle"
  },
  {
    "name": "textnineoldstyle"
  },
  {
    "name": "dagger"
  },
  {
    "name": "ddagger"
  },
  {
    "name": "S"
  },
  {
    "name": "unicode",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "verb",
    "format": "||",
    "snippet": "|$1|"
  }
]
export const DELIMITERS: string[] = [
  "lcorner",
  "rcorner",
  "lcorner",
  "rcorner",
  "lvert",
  "rvert",
  "lVert",
  "rVert",
  "lt",
  "gt",
  "lmoustache",
  "rmoustache",
  "lgroup",
  "rgroup",
  "arrowvert",
  "Arrowvert",
  "bracevert",
  "Vert",
  "vert",
  "uparrow",
  "downarrow",
  "updownarrow",
  "Uparrow",
  "Downarrow",
  "Updownarrow",
  "backslash",
  "rangle",
  "langle",
  "rbrace",
  "lbrace",
  "rceil",
  "lceil",
  "rfloor",
  "lfloor",
  "lbrack",
  "rbrack",
  "lparen",
  "rparen"
]
export const ENVIRONMENTS: string[] = [
  "equation*",
  "eqnarray*",
  "align",
  "align*",
  "multline",
  "multline*",
  "split",
  "gather",
  "gather*",
  "alignat",
  "alignat*",
  "alignedat",
  "aligned",
  "gathered",
  "xalignat",
  "xalignat*",
  "xxalignat",
  "flalign",
  "flalign*",
  "subarray",
  "smallmatrix",
  "matrix",
  "pmatrix",
  "bmatrix",
  "Bmatrix",
  "vmatrix",
  "Vmatrix",
  "cases",
  "CD",
  "array",
  "equation",
  "eqnarray",
  "prooftree",
  "numcases",
  "subnumcases",
  "empheq",
  "dcases",
  "rcases",
  "drcases",
  "dcases*",
  "rcases*",
  "drcases*",
  "cases*",
  "matrix*",
  "pmatrix*",
  "bmatrix*",
  "Bmatrix*",
  "vmatrix*",
  "Vmatrix*",
  "smallmatrix*",
  "psmallmatrix",
  "psmallmatrix*",
  "bsmallmatrix",
  "bsmallmatrix*",
  "Bsmallmatrix",
  "Bsmallmatrix*",
  "vsmallmatrix",
  "vsmallmatrix*",
  "Vsmallmatrix",
  "Vsmallmatrix*",
  "crampedsubarray",
  "multlined",
  "spreadlines",
  "lgathered",
  "rgathered",
  "smallmatrix"
]
export const MACROS: Completion[] = [
  {
    "name": "@",
    "format": "??{}?",
    "snippet": "$1$1{$2}$1"
  },
  {
    "name": "@",
    "format": "?{}??",
    "snippet": "$1{$2}$1$1"
  },
  {
    "name": "@",
    "format": "???",
    "snippet": "$1$1$1"
  },
  {
    "name": "_",
    "format": "{}",
    "snippet": "{$1}"
  },
  {
    "name": "^",
    "format": "{}",
    "snippet": "{$1}"
  }
]