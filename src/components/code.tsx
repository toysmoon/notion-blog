import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

const Code = ({ children }) => {
  return (
    <>
      <code
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(children, Prism.languages['javascript']),
        }}
      />

      <style jsx>{`
        code {
          display: block;
          padding: 0.8rem;
          line-height: 1.5;
          background: #f5f5f5;
          font-size: 0.75rem;
          border-radius: var(--radius);
          white-space: pre-wrap;
          tab-size: 2;
        }
      `}</style>
    </>
  )
}

export default Code
