import Prism from "prism-react-renderer/prism"

// https://www.deg84.com/enable-ruby-syntax-highlighting-with-prism-react-renderer/

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            Prism: any
        }
    }
}

declare global {
    interface Window {
        Prism: any
    }
}

;(typeof global !== 'undefined' ? global : window).Prism = Prism

require('prismjs/components/prism-ruby')
require('prismjs/components/prism-php')
require('prismjs/components/prism-nginx')
